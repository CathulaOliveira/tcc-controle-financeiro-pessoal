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
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountOrigin_Id(
                filter.getDateStart(),
                filter.getDateFinish(),
                TypeTransaction.ENTRADA,
                filter.getAccount().getId()
        ));
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountDestination_Id(
                filter.getDateStart(),
                filter.getDateFinish(),
                TypeTransaction.TRANSFERENCIA,
                filter.getAccount().getId()
        ));
        return listTransactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public BigDecimal calculateOutputByFilterBalance(CashFlowFilter filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountOrigin_Id(
                filter.getDateStart(),
                filter.getDateFinish(),
                TypeTransaction.SAIDA,
                filter.getAccount().getId()
        ));
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountOrigin_Id(
                filter.getDateStart(),
                filter.getDateFinish(),
                TypeTransaction.TRANSFERENCIA,
                filter.getAccount().getId()
        ));
        return listTransactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public List<Transaction> listTransactionsByFilterBalance(CashFlowFilter filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(transactionRepository.findByDateBetweenAndAccountOrigin_Id(
                filter.getDateStart(),
                filter.getDateFinish(),
                filter.getAccount().getId()
        ));
        listTransactions.addAll(transactionRepository.findByDateBetweenAndAccountDestination_Id(
                filter.getDateStart(),
                filter.getDateFinish(),
                filter.getAccount().getId()
        ));
        listTransactions.sort(Comparator.comparing(Transaction::getDate));
        return listTransactions;
    }

    public List<Transaction> findByUserLogged() {
        User userLogged = userService.getUserLogged();
        return transactionRepository.findByAccountOrigin_User_IdOrAccountDestination_User_Id(userLogged.getId(), userLogged.getId());
    }

    public Transaction findByRecurringTransaction(Long id) {
        return transactionRepository.findByRecurringTransaction_Id(id);
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
