package br.edu.utfpr.service;

import br.edu.utfpr.filter.ReportFilter;
import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Category;
import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.service.impl.AccountServiceImpl;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportService {

    private final CategoryService categoryService;
    private final TransactionServiceImpl transactionService;
    private final AccountServiceImpl accountService;
    private final EntityManager entityManager;

    public byte[] generateReport() throws JRException {
        // Carregue o modelo do relatório
        InputStream reportStream = getClass().getResourceAsStream("/reports/employee_report.jasper");

        // Compile o modelo
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Crie uma fonte de dados
        List<Category> list = categoryService.findAll();
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(list);

        Map<String, Object> params = new HashMap<>();

        // Gere o relatório em formato PDF
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] generateReport(ReportFilter filter) throws JRException {
        // Carregue o modelo do relatório
        InputStream reportStream = getClass().getResourceAsStream("/reports/transations_report.jasper");

        // Compile o modelo
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Crie uma fonte de dados
        List<Transaction> list = findTransactionsByReportFilter(filter);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(list);

        Map<String, Object> params = new HashMap<>();

        // Gere o relatório em formato PDF
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    private void tratarParametros(ReportFilter filter) {
        if (filter.getAccounts() == null || filter.getAccounts().isEmpty()) {
            List<Long> accounts = accountService.findByUserLogged()
                    .stream()
                    .map(Account::getId)
                    .collect(Collectors.toList());
            filter.setAccounts(accounts);
        }
    }

    public List<Transaction> findTransactionsByReportFilter(ReportFilter filter) {
        tratarParametros(filter);

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Transaction> query = cb.createQuery(Transaction.class);
        Root<Transaction> root = query.from(Transaction.class);

        List<Predicate> predicates = new ArrayList<>();

        if (filter.getType() != null && !filter.getType().isEmpty()) {
            predicates.add(root.get("type").in(filter.getType()));
        }

        if (filter.getAccounts() != null && !filter.getAccounts().isEmpty()) {
            Predicate predicate = cb.or(
                    cb.in(root.get("accountOrigin").get("id")).value(filter.getAccounts()),
                    cb.in(root.get("accountDestination").get("id")).value(filter.getAccounts())
            );
            predicates.add(predicate);
        }

        if (filter.getCategories() != null && !filter.getCategories().isEmpty()) {
            predicates.add(root.get("category").get("id").in(filter.getCategories()));
        }

        if (filter.getDateInit() != null) {
            Predicate dateRangePredicate = cb.and(
                    cb.greaterThanOrEqualTo(root.get("date"), filter.getDateInit())  // Data maior ou igual à data inicial
            );
            predicates.add(dateRangePredicate);
        }

        if (filter.getDateFinish() != null) {
            Predicate dateRangePredicate = cb.and(
                    cb.lessThanOrEqualTo(root.get("date"), filter.getDateFinish()) // Data menor ou igual à data final
            );
            predicates.add(dateRangePredicate);
        }

        query.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }
}
