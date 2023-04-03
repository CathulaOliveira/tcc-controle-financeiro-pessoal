package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.Goal;
import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.repository.GoalRepository;
import br.edu.utfpr.repository.RecurringTransactionRepository;
import br.edu.utfpr.service.GoalService;
import br.edu.utfpr.service.RecurringTransactionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class RecurringTransactionServiceImpl
        extends CrudServiceImpl<RecurringTransaction, Long>
        implements RecurringTransactionService {

    private RecurringTransactionRepository recurringTransactionRepository;

    public RecurringTransactionServiceImpl(RecurringTransactionRepository recurringTransactionRepository) {
        this.recurringTransactionRepository = recurringTransactionRepository;
    }

    @Override
    protected JpaRepository<RecurringTransaction, Long> getRepository() {
        return this.recurringTransactionRepository;
    }
}
