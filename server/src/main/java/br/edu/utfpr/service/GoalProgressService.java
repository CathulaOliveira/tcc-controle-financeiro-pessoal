package br.edu.utfpr.service;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.model.Goal;
import br.edu.utfpr.model.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@RequiredArgsConstructor
@Service
public class GoalProgressService {

    private final GoalService goalService;

    public void atualizarProgressoMetaEmInclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getType() != null && transaction.getGoal() != null) {
            Goal goal = goalService.findOne(transaction.getGoal().getId());
            switch (transaction.getType()) {
                case ENTRADA -> {
                    if (goal.getTypeTransactionExpected().equals(TypeTransaction.ENTRADA)) {
                        somaProgresso(transaction, goal);
                    } else if (goal.getTypeTransactionExpected().equals(TypeTransaction.SAIDA)) {
                        subtraiProgresso(transaction, goal);
                    }
                }
                case SAIDA -> {
                    if (goal.getTypeTransactionExpected().equals(TypeTransaction.ENTRADA)) {
                        subtraiProgresso(transaction, goal);
                    } else if (goal.getTypeTransactionExpected().equals(TypeTransaction.SAIDA)) {
                        somaProgresso(transaction, goal);
                    }
                }
            }
            goalService.save(goal);
        }
    }

    public void atualizarProgressoMetaEmExclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getType() != null && transaction.getGoal() != null) {
            Goal goal = goalService.findOne(transaction.getGoal().getId());
            switch (transaction.getType()) {
                case ENTRADA -> {
                    if (goal.getTypeTransactionExpected().equals(TypeTransaction.ENTRADA)) {
                        subtraiProgresso(transaction, goal);
                    } else if (goal.getTypeTransactionExpected().equals(TypeTransaction.SAIDA)) {
                        somaProgresso(transaction, goal);
                    }
                }
                case SAIDA -> {
                    if (goal.getTypeTransactionExpected().equals(TypeTransaction.ENTRADA)) {
                        somaProgresso(transaction, goal);
                    } else if (goal.getTypeTransactionExpected().equals(TypeTransaction.SAIDA)) {
                        subtraiProgresso(transaction, goal);
                    }
                }
            }
            goalService.save(goal);
        }
    }

    private void somaProgresso(Transaction transaction, Goal goal) {
        BigDecimal newBalance = (goal.getProgress() != null ? goal.getProgress() : BigDecimal.ZERO).add(transaction.getPrice());
        goal.setProgress(newBalance);
    }

    private void subtraiProgresso(Transaction transaction, Goal goal) {
        BigDecimal newBalance = (goal.getProgress() != null ? goal.getProgress() : BigDecimal.ZERO).subtract(transaction.getPrice());
        goal.setProgress(newBalance);
    }
}
