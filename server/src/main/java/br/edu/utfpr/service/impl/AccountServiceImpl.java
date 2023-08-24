package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.AccountRepository;
import br.edu.utfpr.service.AccountService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl
        extends CrudServiceImpl<Account, Long>
        implements AccountService {

    private final AccountRepository accountRepository;
    private final UserService userService;

    @Override
    protected JpaRepository<Account, Long> getRepository() {
        return this.accountRepository;
    }

    public List<Account> findByUserId(long userId) {
        return accountRepository.findByUserId(userId);
    }

    public List<Account> findByUserLogged() {
        User user = userService.getUserLogged();
        return findByUserId(user.getId());
    }

    public BigDecimal getBalance(Long accountId) {
        return findOne(accountId).getBalance();
    }

    public BigDecimal getBalanceByAccounts(List<Long> accountsId) {
        return accountRepository.getBalanceByAccounts(accountsId);
    }

    // culpa do Aspect
    @Override
    public Account save(Account entity) {
        return super.save(entity);
    }
}
