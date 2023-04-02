package br.edu.utfpr.controller;

import br.edu.utfpr.model.Account;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.impl.AccountServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("accounts")
@RequiredArgsConstructor
public class AccountController extends CrudController<Account, Long> {

    private final AccountServiceImpl accountService;

    @Override
    protected CrudService<Account, Long> getService() {
        return this.accountService;
    }

    @GetMapping("find-by-user-logged")
    public List<Account> findByUserLogged() {
        return this.accountService.findByUserLogged();
    }

    @GetMapping("balance/{id}")
    public BigDecimal getBalance(@PathVariable Long id) {
        return this.accountService.getBalance(id);
    }
}
