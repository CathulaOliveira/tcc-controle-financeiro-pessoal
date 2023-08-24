package br.edu.utfpr.repository;

import br.edu.utfpr.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(long userId);
    @Query(value = "SELECT sum(a.balance) FROM Account as a where a.id in (:accountsId)")
    BigDecimal getBalanceByAccounts (List<Long> accountsId);
}
