package br.edu.utfpr.controller;

import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("transactions")
@RequiredArgsConstructor
public class TransactionController extends CrudController<Transaction, Long> {

    private final TransactionServiceImpl transactionService;

    @Override
    protected CrudService<Transaction, Long> getService() {
        return this.transactionService;
    }

    @GetMapping("find-by-user-logged")
    public List<Transaction> findByUserLogged() {
        return this.transactionService.findByUserLogged();
    }
}
