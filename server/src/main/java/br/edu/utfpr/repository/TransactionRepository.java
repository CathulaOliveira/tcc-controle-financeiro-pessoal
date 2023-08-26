package br.edu.utfpr.repository;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.model.Chart;
import br.edu.utfpr.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

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

    @Query(value = "select new br.edu.utfpr.model.Chart(t.category.name, count(t)) from Transaction as t where (t.accountOrigin.id in (:accountOriginIds) or t.accountDestination.id in (:accountDestinationIds)) and t.date between :dateStart and :dateFinish group by t.category.name")
    List<Chart> countTransactionsByCategory(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<Long> accountOriginIds,
            List<Long> accountDestinationIds
    );

    @Query(value = "select new br.edu.utfpr.model.Chart(t.type, sum(t.price)) from Transaction as t where (t.accountOrigin.id in (:accountOriginIds) or t.accountDestination.id in (:accountDestinationIds)) and t.date between :dateStart and :dateFinish group by t.type")
    List<Chart> sumTransactionsByType(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<Long> accountOriginIds,
            List<Long> accountDestinationIds
    );

//    where (t.accountOrigin.id in (:accountOriginIds) or t.accountDestination.id in (:accountDestinationIds)) and t.date between :dateStart and :dateFinish group by t.category.name")
    @Query(value = "SELECT new br.edu.utfpr.model.Chart(t.category.name, " +
            "       SUM(" +
            "           CASE WHEN t.type = 'ENTRADA' THEN t.price ELSE 0 END" +
            "       ), " +
            "       SUM(" +
            "           CASE WHEN t.type = 'SAIDA' THEN t.price ELSE 0 END" +
            "       )) " +
            "FROM Transaction as t " +
            " where (t.accountOrigin.id in (:accountOriginIds) or t.accountDestination.id in (:accountDestinationIds)) and t.date between :dateStart and :dateFinish group by t.category.name")
    List<Chart> sumTransactionsByCategory(
            LocalDate dateStart,
            LocalDate dateFinish,
            List<Long> accountOriginIds,
            List<Long> accountDestinationIds
    );
}
