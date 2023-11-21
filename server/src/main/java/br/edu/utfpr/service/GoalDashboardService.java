package br.edu.utfpr.service;

import br.edu.utfpr.filter.DashboardFilter;
import br.edu.utfpr.model.*;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GoalDashboardService {

    private final GoalService goalService;
    private final TransactionServiceImpl transactionService;

    public GoalDashboard getGoalDashboard(Long goalId) {
        Goal goal = goalService.findOne(goalId);

        List<Transaction> transactions = transactionService.findByGoal(goalId);
        List<GoalTransaction> goalTransactions = transactions.stream()
                .map(obj -> new GoalTransaction(obj.getDate(), obj.getPrice(), obj.getType(), goal.getTypeTransactionExpected()))
                .collect(Collectors.toList());

        GoalDashboard goalDashboard = new GoalDashboard();
        if (goal.getProgress() != null) {
            goalDashboard.setPercentage(goal.getProgress().divide(goal.getPrice(), 4, BigDecimal.ROUND_HALF_UP)
                    .multiply(new BigDecimal("100")));
        } else {
            goalDashboard.setPercentage(BigDecimal.ZERO);
        }
        goalDashboard.setStartDate(goal.getStartDate());
        goalDashboard.setEndDate(goal.getEndDate());
        goalDashboard.setPrice(goal.getPrice());
        goalDashboard.setTransactions(goalTransactions);

        return goalDashboard;
    }
}
