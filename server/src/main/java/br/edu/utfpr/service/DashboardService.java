package br.edu.utfpr.service;

import br.edu.utfpr.filter.DashboardFilter;
import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Dashboard;
import br.edu.utfpr.service.impl.AccountServiceImpl;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DashboardService {

    private final AccountServiceImpl accountService;
    private final TransactionServiceImpl transactionService;

    public Dashboard getDashboard(DashboardFilter filter) {
        Dashboard dashboard = new Dashboard();
        this.tratarParametros(filter);

        BigDecimal totalEntradas = transactionService.calculateEntryByDashboardFilter(filter);
        BigDecimal totalSaidas = transactionService.calculateOutputByDashboardFilter(filter);

        dashboard.setTotalSaldo(accountService.getBalanceByAccounts(filter.getAccounts()));
        dashboard.setTotalEntradas(totalEntradas);
        dashboard.setTotalSaidas(totalSaidas);
        dashboard.setTotalBalanco(totalEntradas.subtract(totalSaidas));

        return dashboard;
    }

    private void tratarParametros(DashboardFilter filter) {
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
