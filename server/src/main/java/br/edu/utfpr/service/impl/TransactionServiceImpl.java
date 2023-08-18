package br.edu.utfpr.service.impl;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.TransactionRepository;
import br.edu.utfpr.service.TransactionService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl
        extends CrudServiceImpl<Transaction, Long>
        implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserService userService;

    @Override
    protected JpaRepository<Transaction, Long> getRepository() {
        return this.transactionRepository;
    }

    public BigDecimal calculateEntryByFilterBalance(CashFlowFilter filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeInAndAccountDestination_IdInAndIsRecurringTransactionEquals(
            filter.getDateStart(),
            filter.getDateFinish(),
            List.of(TypeTransaction.ENTRADA, TypeTransaction.TRANSFERENCIA),
            filter.getAccounts(),
            true
        ));

        return listTransactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public BigDecimal calculateOutputByFilterBalance(CashFlowFilter filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeInAndAccountOrigin_IdInAndIsRecurringTransactionEquals(
                filter.getDateStart(),
                filter.getDateFinish(),
                List.of(TypeTransaction.SAIDA, TypeTransaction.TRANSFERENCIA),
                filter.getAccounts(),
                true
        ));
        return listTransactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public List<Transaction> listTransactionsByFilterBalance(CashFlowFilter filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(transactionRepository.findByDateBetweenAndAccountOrigin_IdInOrAndAccountDestination_IdIn(
                filter.getDateStart(),
                filter.getDateFinish(),
                filter.getAccounts(),
                filter.getAccounts()
        ));
        listTransactions.sort(Comparator.comparing(Transaction::getDate));
        return listTransactions;
    }

    public List<Transaction> findByUserLogged() {
        User userLogged = userService.getUserLogged();
        return transactionRepository.findByAccountOrigin_User_IdOrAccountDestination_User_Id(userLogged.getId(), userLogged.getId());
    }

    public Transaction findByRecurringTransactionAndDateBetween(Long id, CashFlowFilter filter) {
        return transactionRepository.findByRecurringTransaction_IdAndDateBetween(id, filter.getDateStart(), filter.getDateFinish());
    }

    // culpa do Aspect
    @Override
    public Transaction save(Transaction entity) {
        return super.save(entity);
    }
    @Override
    public void delete(Long id) {
        super.delete(id);
    }
}
