package br.edu.utfpr.service.impl;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.RecurringTransactionRepository;
import br.edu.utfpr.service.RecurringTransactionService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecurringTransactionServiceImpl
        extends CrudServiceImpl<RecurringTransaction, Long>
        implements RecurringTransactionService {

    private final RecurringTransactionRepository recurringTransactionRepository;
    private final UserService userService;

    @Override
    protected JpaRepository<RecurringTransaction, Long> getRepository() {
        return this.recurringTransactionRepository;
    }

    public List<RecurringTransaction> findByUserLogged() {
        User userLogged = userService.getUserLogged();
        return recurringTransactionRepository.findByAccountOrigin_User_IdOrAccountDestination_User_Id(userLogged.getId(), userLogged.getId());
    }

    public List<RecurringTransaction> findByCashFlowFilter(CashFlowFilter filter) {
        if (filter.getType() != null) {
            return recurringTransactionRepository.findByTypeAndAccountOrigin_IdInOrAccountDestination_IdIn(
                    filter.getType(),
                    filter.getAccounts(),
                    filter.getAccounts()
            );
        } else {
            return recurringTransactionRepository.findByAccountOrigin_IdInOrAccountDestination_IdIn(
                    filter.getAccounts(),
                    filter.getAccounts()
            );
        }
    }

    public BigDecimal calculateEntryByFilterBalance(CashFlowFilter filter) {
        List<RecurringTransaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(recurringTransactionRepository.findByTypeInAndAccountDestination_IdIn(
                List.of(TypeTransaction.ENTRADA, TypeTransaction.TRANSFERENCIA),
                filter.getAccounts()
        ));

        return listTransactions.stream().map(RecurringTransaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public BigDecimal calculateOutputByFilterBalance(CashFlowFilter filter) {
        List<RecurringTransaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(recurringTransactionRepository.findByTypeInAndAccountOrigin_IdIn(
                List.of(TypeTransaction.SAIDA, TypeTransaction.TRANSFERENCIA),
                filter.getAccounts()
        ));
        return listTransactions.stream().map(RecurringTransaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public List<RecurringTransaction> findByDueDate() {
        return recurringTransactionRepository.findByDueDateEquals(LocalDate.now());
    }
}
