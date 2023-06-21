package br.edu.utfpr.controller;

import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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

    @PostMapping("calcular-total-entradas")
    public BigDecimal calcularTotalEntradas(@RequestBody CashFlowFilter filter) {
        return this.transactionService.calculateEntryByFilterBalance(filter);
    }

    @PostMapping("calcular-total-saidas")
    public BigDecimal calcularTotalSaidas(@RequestBody CashFlowFilter filter) {
        return this.transactionService.calculateOutputByFilterBalance(filter);
    }

    @PostMapping("find-by-account")
    public List<Transaction> findByAccount(@RequestBody CashFlowFilter filter) {
        return this.transactionService.listTransactionsByFilterBalance(filter);
    }

    @GetMapping("find-by-user-logged")
    public List<Transaction> findByUserLogged() {
        return this.transactionService.findByUserLogged();
    }
}
