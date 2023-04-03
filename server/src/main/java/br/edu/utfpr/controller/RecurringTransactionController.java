package br.edu.utfpr.controller;

import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.RecurringTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("recurring-transactions")
@RequiredArgsConstructor
public class RecurringTransactionController extends CrudController<RecurringTransaction, Long> {

    private final RecurringTransactionService recurringTransactionService;

    @Override
    protected CrudService<RecurringTransaction, Long> getService() {
        return this.recurringTransactionService;
    }
}
