package br.edu.utfpr.repository;

import br.edu.utfpr.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(long userId);
}
