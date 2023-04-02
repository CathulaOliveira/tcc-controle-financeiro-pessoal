package br.edu.utfpr.service.impl;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.filter.FilterBalance;
import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.TransactionRepository;
import br.edu.utfpr.service.TransactionService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
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

    public BigDecimal calculateEntryByFilterBalance(FilterBalance filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        LocalDate dateStart = LocalDate.of(Integer.parseInt(filter.getYear()), Integer.parseInt(filter.getMonth()), 1);
        LocalDate dateFinish = LocalDate.of(Integer.parseInt(filter.getYear()), Integer.parseInt(filter.getMonth())+1, 1);
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountOrigin_Id(
                dateStart,
                dateFinish,
                TypeTransaction.ENTRADA,
                Long.parseLong(filter.getAccountId())
        ));
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountDestination_Id(
                dateStart,
                dateFinish,
                TypeTransaction.TRANSFERENCIA,
                Long.parseLong(filter.getAccountId())
        ));
        return listTransactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public BigDecimal calculateOutputByFilterBalance(FilterBalance filter) {
        List<Transaction> listTransactions = new ArrayList<>();
        LocalDate dateStart = LocalDate.of(Integer.parseInt(filter.getYear()), Integer.parseInt(filter.getMonth()), 1);
        LocalDate dateFinish = LocalDate.of(Integer.parseInt(filter.getYear()), Integer.parseInt(filter.getMonth())+1, 1);
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountOrigin_Id(
                dateStart,
                dateFinish,
                TypeTransaction.SAIDA,
                Long.parseLong(filter.getAccountId())
        ));
        listTransactions.addAll(transactionRepository.findByDateBetweenAndTypeAndAccountOrigin_Id(
                dateStart,
                dateFinish,
                TypeTransaction.TRANSFERENCIA,
                Long.parseLong(filter.getAccountId())
        ));
        return listTransactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
    }

    public List<Transaction> listTransactionsByFilterBalance(FilterBalance filter) {
        LocalDate dateStart = LocalDate.of(Integer.parseInt(filter.getYear()), Integer.parseInt(filter.getMonth()), 1);
        LocalDate dateFinish = LocalDate.of(Integer.parseInt(filter.getYear()), Integer.parseInt(filter.getMonth())+1, 1);
        List<Transaction> listTransactions = new ArrayList<>();
        listTransactions.addAll(transactionRepository.findByDateBetweenAndAccountOrigin_Id(
                dateStart,
                dateFinish,
                Long.parseLong(filter.getAccountId())
        ));
        listTransactions.addAll(transactionRepository.findByDateBetweenAndAccountDestination_Id(
                dateStart,
                dateFinish,
                Long.parseLong(filter.getAccountId())
        ));
        Collections.sort(listTransactions, Comparator.comparing(Transaction::getDate));
        return listTransactions;
    }

    public List<Transaction> findByUserLogged() {
        User userLogged = userService.getUserLogged();
        return transactionRepository.findByAccountOrigin_User_Id(userLogged.getId());
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
