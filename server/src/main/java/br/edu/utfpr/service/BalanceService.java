package br.edu.utfpr.service;

import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@RequiredArgsConstructor
@Service
public class BalanceService {

    private final AccountService accountService;

    public void atualizarSaldoContaEmInclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getType() != null) {
            Account accountOrigin = null;
            Account accountDestination = null;
            if (transaction.getAccountOrigin() != null && transaction.getAccountOrigin().getId() != null) {
                accountOrigin  = accountService.findOne(transaction.getAccountOrigin().getId());
            }
            if (transaction.getAccountDestination() != null && transaction.getAccountDestination().getId() != null) {
                accountDestination = accountService.findOne(transaction.getAccountDestination().getId());
            }
            switch (transaction.getType()) {
                case ENTRADA -> {
                    assert accountDestination != null;
                    somaSaldoConta(transaction, accountDestination);
                    accountService.save(accountDestination);
                }
                case SAIDA -> {
                    assert accountOrigin != null;
                    subtraiSaldoConta(transaction, accountOrigin);
                    accountService.save(accountOrigin);
                }
                case TRANSFERENCIA -> {
                    assert accountOrigin != null;
                    subtraiSaldoConta(transaction, accountOrigin);
                    accountService.save(accountOrigin);
                    assert accountDestination != null;
                    somaSaldoConta(transaction, accountDestination);
                    accountService.save(accountDestination);
                }
            }
        } else {
            System.out.println("NÃO FOI POSSIVEL ATUALIZAR O SALDO DA CONTA");
        }
    }

    public void atualizarSaldoContaEmExclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getType() != null) {
            Account accountOrigin = null;
            Account accountDestination = null;
            if (transaction.getAccountOrigin() != null && transaction.getAccountOrigin().getId() != null) {
                accountOrigin = accountService.findOne(transaction.getAccountOrigin().getId());
            }
            if (transaction.getAccountDestination() != null && transaction.getAccountDestination().getId() != null) {
                accountDestination = accountService.findOne(transaction.getAccountDestination().getId());
            }
            switch (transaction.getType()) {
                case ENTRADA -> {
                    assert accountDestination != null;
                    subtraiSaldoConta(transaction, accountDestination);
                    accountService.save(accountDestination);
                }
                case SAIDA -> {
                    assert accountOrigin != null;
                    somaSaldoConta(transaction, accountOrigin);
                    accountService.save(accountOrigin);
                }
                case TRANSFERENCIA -> {
                    assert accountOrigin != null;
                    somaSaldoConta(transaction, accountOrigin);
                    accountService.save(accountOrigin);
                    assert accountDestination != null;
                    subtraiSaldoConta(transaction, accountDestination);
                    accountService.save(accountDestination);
                }
            }
        } else {
            System.out.println("NÃO FOI POSSIVEL ATUALIZAR O SALDO DA CONTA");
        }
    }

    private void somaSaldoConta(Transaction transaction, Account account) {
        BigDecimal newBalance = (account.getBalance()!=null ? account.getBalance() : BigDecimal.ZERO).add(transaction.getPrice());
        account.setBalance(newBalance);
    }

    private void subtraiSaldoConta(Transaction transaction, Account account) {
        BigDecimal newBalance = (account.getBalance()!=null ? account.getBalance() : BigDecimal.ZERO).subtract(transaction.getPrice());
        account.setBalance(newBalance);
    }
}
