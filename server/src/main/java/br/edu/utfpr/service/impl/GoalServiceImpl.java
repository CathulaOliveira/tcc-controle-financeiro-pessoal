package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Goal;
import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.GoalRepository;
import br.edu.utfpr.service.GoalService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl
        extends CrudServiceImpl<Goal, Long>
        implements GoalService {

    private final GoalRepository goalRepository;
    private final UserService userService;
    private final TransactionServiceImpl transactionService;

    @Override
    protected JpaRepository<Goal, Long> getRepository() {
        return this.goalRepository;
    }

    public List<Goal> findByUserId(long userId) {
        return goalRepository.findByUserId(userId);
    }

    public List<Goal> findByUserLogged() {
        User user = userService.getUserLogged();
        return findByUserId(user.getId());
    }

    public BigDecimal getAverageValue(Long categoryId) {
        List<Transaction> transactions = transactionService.findByUserLogged();
        // Obtendo a data atual
        LocalDate currentDate = LocalDate.now();
        // Obtendo a data há 3 meses a partir da data atual
        LocalDate threeMonthsAgo = currentDate.minusMonths(3);
        List<Transaction> recentTransactions = transactions.stream()
                .filter(transaction -> (transaction.getDate().isAfter(threeMonthsAgo)
                        || transaction.getDate().isEqual(threeMonthsAgo))
                        && transaction.getCategory().getId().equals(categoryId)
                ).toList();
        // Calculando a média dos valores do campo price das transações recentes
        BigDecimal sumOfPrices = recentTransactions.stream()
                .map(Transaction::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal averagePrice = BigDecimal.ZERO;
        if (recentTransactions.size() > 0) {
            averagePrice = sumOfPrices.divide(BigDecimal.valueOf(recentTransactions.size()), 2, RoundingMode.HALF_UP);
        }

        return averagePrice;
    }

    // culpa do Aspect
    @Override
    public Goal save(Goal entity) {
        return super.save(entity);
    }
}
