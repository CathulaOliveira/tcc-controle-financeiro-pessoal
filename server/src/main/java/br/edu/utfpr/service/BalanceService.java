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
        if (transaction.getAccountOrigin() != null && transaction.getType() != null) {
            Account accountOrigin = accountService.findOne(transaction.getAccountOrigin().getId());
            Account accountDestination = null;
            if (transaction.getAccountDestination() != null && transaction.getAccountDestination().getId() != null) {
                accountDestination = accountService.findOne(transaction.getAccountDestination().getId());
            }
            switch (transaction.getType()) {
                case ENTRADA:
                    somaSaldoConta(transaction, accountOrigin);
                    break;
                case SAIDA:
                    subtraiSaldoConta(transaction, accountOrigin);
                    break;
                case TRANSFERENCIA:
                    if (transaction.getAccountDestination() != null) {
                        subtraiSaldoConta(transaction, accountOrigin);
                        somaSaldoConta(transaction, accountDestination);
                        accountService.save(accountDestination);
                    }
                    break;
            }
            accountService.save(accountOrigin);
        } else {
            System.out.println("NÃO FOI POSSIVEL ATUALIZAR O SALDO DA CONTA");
        }
    }

    public void atualizarSaldoContaEmExclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getAccountOrigin() != null && transaction.getType() != null) {
            Account accountOrigin = accountService.findOne(transaction.getAccountOrigin().getId());
            Account accountDestination = null;
            if (transaction.getAccountDestination() != null && transaction.getAccountDestination().getId() != null) {
                accountDestination = accountService.findOne(transaction.getAccountDestination().getId());
            }
            switch (transaction.getType()) {
                case ENTRADA:
                    subtraiSaldoConta(transaction, accountOrigin);
                    break;
                case SAIDA:
                    somaSaldoConta(transaction, accountOrigin);
                    break;
                case TRANSFERENCIA:
                    if (transaction.getAccountDestination() != null) {
                        somaSaldoConta(transaction, accountOrigin);
                        subtraiSaldoConta(transaction, accountDestination);
                        accountService.save(accountDestination);
                    }
                    break;
            }
            accountService.save(accountOrigin);
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
