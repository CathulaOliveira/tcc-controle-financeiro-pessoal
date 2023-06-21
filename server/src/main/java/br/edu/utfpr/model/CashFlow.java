package br.edu.utfpr.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CashFlow {

    private List<RecurringTransaction> transactions;
    private BigDecimal totalEntradasPrevistas;
    private BigDecimal totalEntradasRealizadas;
    private BigDecimal totalSaidasPrevistas;
    private BigDecimal totalSaidasRealizadas;
    private BigDecimal totalSaldoPrevisto;
    private BigDecimal totalSaldoRealizado;
}
