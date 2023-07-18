package br.edu.utfpr.service;

import br.edu.utfpr.enums.PaymentStatus;
import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.*;
import br.edu.utfpr.service.impl.AccountServiceImpl;
import br.edu.utfpr.service.impl.RecurringTransactionServiceImpl;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CashFlowService {

    private final AccountServiceImpl accountService;
    private final TransactionServiceImpl transactionService;
    private final RecurringTransactionServiceImpl recurringTransactionService;

    public CashFlow getCashFlow(CashFlowFilter filter) {
        CashFlow cashFlow = new CashFlow();

        this.tratarParametros(filter);

        List<RecurringTransaction> transactions = recurringTransactionService.findByCashFlowFilter(filter);
        getStatusTransactions(transactions, filter);
        cashFlow.setTransactions(transactions);

        BigDecimal totalEntradasPrevistas = recurringTransactionService.calculateEntryByFilterBalance(filter);
        BigDecimal totalEntradasRealizadas = transactionService.calculateEntryByFilterBalance(filter);
        BigDecimal totalSaidasPrevistas = recurringTransactionService.calculateOutputByFilterBalance(filter);
        BigDecimal totalSaidasRealizadas = transactionService.calculateOutputByFilterBalance(filter);

        cashFlow.setTotalEntradasPrevistas(totalEntradasPrevistas);
        cashFlow.setTotalEntradasRealizadas(totalEntradasRealizadas);
        cashFlow.setTotalSaidasPrevistas(totalSaidasPrevistas);
        cashFlow.setTotalSaidasRealizadas(totalSaidasRealizadas);
        cashFlow.setTotalSaldoPrevisto(totalEntradasPrevistas.subtract(totalSaidasPrevistas));
        cashFlow.setTotalSaldoRealizado(totalEntradasRealizadas.subtract(totalSaidasRealizadas));

        return cashFlow;
    }

    private void getStatusTransactions(List<RecurringTransaction> transactions, CashFlowFilter filter) {
        if (transactions != null) {
            transactions.forEach(recurringTransaction -> {
                Transaction transaction = transactionService.findByRecurringTransactionAndDateBetween(recurringTransaction.getId(), filter);
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
        LocalDate dateFinish = LocalDate.of(year, month+1, 1);
        filter.setDateFinish(dateFinish.minusDays(1l));

        if (filter.getAccounts() == null) {
            List<Long> accounts = accountService.findByUserLogged()
                    .stream()
                    .map(Account::getId)
                    .collect(Collectors.toList());
            filter.setAccounts(accounts);
        }
    }
}
