package br.edu.utfpr.repository;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByDateBetweenAndAccountOrigin_IdInOrAndAccountDestination_IdIn(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<Long> accountOriginIds,
            List<Long> accountDestinationIds
    );
    List<Transaction> findByDateBetweenAndTypeInAndAccountOrigin_IdInAndIsRecurringTransactionEquals(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<TypeTransaction> type,
            List<Long> accountOriginIds,
            boolean isRecurringTransaction
    );
    List<Transaction> findByDateBetweenAndTypeInAndAccountDestination_IdInAndIsRecurringTransactionEquals(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<TypeTransaction> type,
            List<Long> accountDestinationIds,
            boolean isRecurringTransaction
    );
    List<Transaction> findByAccountOrigin_User_IdOrAccountDestination_User_Id(
            Long accountOriginUserId, Long accountDestinationId
    );

    Transaction findByRecurringTransaction_IdAndDateBetween(Long id, LocalDate dateStart, LocalDate dateFinish);
}
