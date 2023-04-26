package br.edu.utfpr.repository;

import br.edu.utfpr.model.RecurringTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecurringTransactionRepository extends JpaRepository<RecurringTransaction, Long> {
    List<RecurringTransaction> findByAccountOrigin_User_IdOrAccountDestination_User_Id(
            Long accountOriginUserId, Long accountDestinationId
    );
}
