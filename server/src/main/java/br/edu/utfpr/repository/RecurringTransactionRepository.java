package br.edu.utfpr.repository;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RecurringTransactionRepository extends JpaRepository<RecurringTransaction, Long> {
    List<RecurringTransaction> findByAccountOrigin_User_IdOrAccountDestination_User_Id(
            Long accountOriginUserId, Long accountDestinationId
    );

    List<RecurringTransaction> findByAccountOrigin_IdInOrAccountDestination_IdIn(
            List<Long> accountOriginUserIds, List<Long> accountDestinationIds
    );

    List<RecurringTransaction> findByTypeAndAccountOrigin_IdInOrAccountDestination_IdIn(
            TypeTransaction type, List<Long> accountOriginUserIds, List<Long> accountDestinationIds
    );

    List<RecurringTransaction> findByTypeInAndAccountOrigin_IdIn(
            List<TypeTransaction> type,
            List<Long> accountOriginIds
    );
    List<RecurringTransaction> findByTypeInAndAccountDestination_IdIn(
            List<TypeTransaction> type,
            List<Long> accountDestinationIds
    );
}
