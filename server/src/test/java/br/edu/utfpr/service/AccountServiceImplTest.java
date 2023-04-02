package br.edu.utfpr.service;

import br.edu.utfpr.enums.TypeAccount;
import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.User;
import br.edu.utfpr.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AccountServiceImplTest {

    @Autowired
    AccountServiceImpl underTest;
    @Autowired
    UserService userService;

    @AfterEach
    @BeforeEach
    public void cleanup() {
        underTest.deleteAll();
        userService.deleteAll();
    }

    //Ao salvar uma conta deve setar o usuario logado do sistema como user da conta
    @Test
    void saveAccount() {
        authenticate();
       Account account =
                Account.builder()
                        .number("123")
                        .agency("12")
                        .bank("Teste")
                        .type(TypeAccount.CONTA_CORRENTE)
                        .build();
        underTest.save(account);
        List<Account> accounts = underTest.findAll();
        assertThat(accounts).isNotNull();
    }

    //Ao salvar uma conta deve setar user da conta
    @Test
    void saveAccountAndSetUser() {
        authenticate();
        Account account =
                Account.builder()
                        .number("123")
                        .agency("12")
                        .bank("Teste")
                        .type(TypeAccount.CONTA_CORRENTE)
                        .build();
        underTest.save(account);
        List<Account> accounts = underTest.findAll();
        assertThat(accounts.get(0).getUser()).isNotNull();
    }

    //Ao salvar uma conta deve setar o usuario logado no sistema como user da conta
    @Test
    void saveAccountAndSetUserLogged() {
        authenticate();
        Account account =
                Account.builder()
                        .number("123")
                        .agency("12")
                        .bank("Teste")
                        .type(TypeAccount.CONTA_CORRENTE)
                        .build();
        underTest.save(account);
        List<Account> accounts = underTest.findAll();
        assertThat(accounts.get(0).getUser()).isEqualTo(userService.getUserLogged());
    }

    private void authenticate() {
        User user = userService.save(getValidLoginUser());
        TestSecurityContextHolder
                .getContext()
                .setAuthentication(new TestingAuthenticationToken(user.getUsername(), new ArrayList<GrantedAuthority>()));

    }

    public User getValidLoginUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setPassword("P4ssword");
        return user;
    }
}
