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
    List<Transaction> findByDateBetweenAndTypeInAndAccountOrigin_IdIn(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<TypeTransaction> type,
            List<Long> accountOriginIds
    );
    List<Transaction> findByDateBetweenAndTypeInAndAccountDestination_IdIn(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<TypeTransaction> type,
            List<Long> accountDestinationIds
    );
    List<Transaction> findByAccountOrigin_User_IdOrAccountDestination_User_Id(
            Long accountOriginUserId, Long accountDestinationId
    );

    Transaction findByRecurringTransaction_IdAndDateBetween(Long id, LocalDate dateStart, LocalDate dateFinish);
}
