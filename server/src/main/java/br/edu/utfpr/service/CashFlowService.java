package br.edu.utfpr.service;

import br.edu.utfpr.enums.PaymentStatus;
import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.*;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CashFlowService {

    @PersistenceContext
    private EntityManager entityManager;

    private final UserService userService;
    private final TransactionServiceImpl transactionService;

    public CashFlow getCashFlow(CashFlowFilter filter) {
        User userLogged = userService.getUserLogged();

        CashFlow cashFlow = new CashFlow();

        List<RecurringTransaction> transactions = getTransactions(filter, userLogged);
        cashFlow.setTransactions(transactions);
        getStatusTransactions(transactions);

        this.tratarParametros(filter);

        cashFlow.setTotalEntradasRealizadas(transactionService.calculateEntryByFilterBalance(filter));
        cashFlow.setTotalSaidasRealizadas(transactionService.calculateOutputByFilterBalance(filter));

        return cashFlow;
    }

    private List<RecurringTransaction> getTransactions(CashFlowFilter filter, User userLogged) {
        String sql = """
                SELECT rt.* FROM recurring_transaction rt
                left join account ao on rt.account_origin_id = ao.id 
                left join account ad on rt.account_destination_id = ad.id
                """;
        sql += " where ao.user_id = " + userLogged.getId() + " or ad.user_id = " + userLogged.getId();

        if (filter.getType() != null) {
            sql += " and rt.type = '" + filter.getType().name() + "'";
        }
        if (filter.getAccount() != null) {
            sql += " and (ao.id = " + filter.getAccount().getId() + " or ad.id = " + filter.getAccount().getId() + ")";
        }
        return entityManager.createNativeQuery(sql, RecurringTransaction.class).getResultList();
    }

    private void getStatusTransactions(List<RecurringTransaction> transactions) {
        if (transactions != null) {
            transactions.forEach(recurringTransaction -> {
                Transaction transaction = transactionService.findByRecurringTransaction(recurringTransaction.getId());
                if (transaction != null) {
                    recurringTransaction.setPaymentStatus(PaymentStatus.EFETUADO);
                } else {
                    recurringTransaction.setPaymentStatus(PaymentStatus.PENDENTE);
                }
            });
        }
    }

    private void tratarParametros(CashFlowFilter filter) {
        int year;
        int month;
        if (filter.getYear() != null && !filter.getYear().isEmpty()) {
            year = Integer.parseInt(filter.getYear());
        } else {
            year = LocalDate.now().getYear();
        }

        if (filter.getMonth() != null && !filter.getMonth().isEmpty()) {
            month = Integer.parseInt(filter.getMonth());
        } else {
            month = LocalDate.now().getMonthValue();
        }

        filter.setDateStart(LocalDate.of(year, month, 1));
        filter.setDateFinish(LocalDate.of(year, month+1, 1));

        if (filter.getAccount() == null) {
            filter.setAccount(new Account());
        }
    }
}
