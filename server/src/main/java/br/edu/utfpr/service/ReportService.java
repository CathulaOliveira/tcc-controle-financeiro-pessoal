package br.edu.utfpr.service;

import br.edu.utfpr.model.Category;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final CategoryService categoryService;

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
}
