package br.edu.utfpr.controller;

import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.RecurringTransactionService;
import br.edu.utfpr.service.impl.RecurringTransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("recurring-transactions")
@RequiredArgsConstructor
public class RecurringTransactionController extends CrudController<RecurringTransaction, Long> {

    private final RecurringTransactionServiceImpl recurringTransactionService;

    @Override
    protected CrudService<RecurringTransaction, Long> getService() {
        return this.recurringTransactionService;
    }

    @GetMapping("find-by-user-logged")
    public List<RecurringTransaction> findByUserLogged() {
        return this.recurringTransactionService.findByUserLogged();
    }
}
