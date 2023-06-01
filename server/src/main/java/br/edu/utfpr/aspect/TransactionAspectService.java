package br.edu.utfpr.aspect;

import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.service.BalanceService;
import br.edu.utfpr.service.GoalProgressService;
import br.edu.utfpr.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class TransactionAspectService {

    private final BalanceService balanceService;
    private final TransactionService transactionService;
    private final GoalProgressService goalProgressService;

    @After(value = "execution(* br.edu.utfpr.service.impl.TransactionServiceImpl.save(..)) && args(transaction)")
    public void afterTransactionSave(JoinPoint joinPoint, Transaction transaction) {
        balanceService.atualizarSaldoContaEmInclusaoDeTranferencia(transaction);
        goalProgressService.atualizarProgressoMetaEmInclusaoDeTranferencia(transaction);
    }

    @Before(value = "execution(* br.edu.utfpr.service.impl.TransactionServiceImpl.delete(..)) && args(id)")
    public void beforeTransactionDelete(JoinPoint joinPoint, Long id) {
        Transaction transaction = transactionService.findOne(id);
        balanceService.atualizarSaldoContaEmExclusaoDeTranferencia(transaction);
        goalProgressService.atualizarProgressoMetaEmInclusaoDeTranferencia(transaction);
    }
}
