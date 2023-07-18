package br.edu.utfpr.service;

import br.edu.utfpr.enums.TypeAccount;
import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Category;
import br.edu.utfpr.model.Transaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TransactionServiceImplTest {

    @Autowired
    TransactionServiceImpl underTest;
    @Autowired
    AccountService accountService;
    @Autowired
    UserService userService;
    @Autowired
    CategoryService categoryService;

    @AfterEach
    @BeforeEach
    public void cleanup() {
        underTest.deleteAll();
        accountService.deleteAll();
        userService.deleteAll();
        categoryService.deleteAll();
    }

    @Test
    void saveTransaction() {
        authenticate();
        Category category = createCategoryValid();
        Account accountOrigin = createAccountValid();
        Transaction transaction =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOrigin)
                        .category(category)
                        .price(new BigDecimal(50.0))
                        .date(LocalDate.now())
                        .type(TypeTransaction.ENTRADA)
                        .build();
        underTest.save(transaction);
        List<Transaction> transactions = underTest.findAll();
        assertThat(transactions).isNotNull();
    }

    @Test
    void calculateEntry() {
        authenticate();
        Category category = createCategoryValid();
        Account accountOrigin = createAccountValid();
        Transaction transaction =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOrigin)
                        .category(category)
                        .price(new BigDecimal(100.0))
                        .date(LocalDate.now())
                        .type(TypeTransaction.ENTRADA)
                        .build();
        underTest.save(transaction);
        CashFlowFilter filter = new CashFlowFilter();
        filter.setMonth(""+LocalDate.now().getMonthValue());
        filter.setYear(""+LocalDate.now().getYear());
        filter.setAccounts(List.of(accountOrigin.getId()));
        BigDecimal totalEntry = underTest.calculateEntryByFilterBalance(filter);
        assertThat(totalEntry).isEqualByComparingTo(new BigDecimal(100.00));
    }

    @Test
    void calculateOutput() {
        authenticate();
        Category category = createCategoryValid();
        Account accountOrigin = createAccountValid();
        Transaction transaction =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOrigin)
                        .category(category)
                        .price(new BigDecimal(50.0))
                        .date(LocalDate.now())
                        .type(TypeTransaction.SAIDA)
                        .build();
        underTest.save(transaction);
        CashFlowFilter filter = new CashFlowFilter();
        filter.setMonth(""+LocalDate.now().getMonthValue());
        filter.setYear(""+LocalDate.now().getYear());
        filter.setAccounts(List.of(accountOrigin.getId()));
        BigDecimal totalOutput = underTest.calculateOutputByFilterBalance(filter);
        assertThat(totalOutput).isEqualByComparingTo(new BigDecimal(50.00));
    }

    @Test
    void transactionsByAccount() {
        authenticate();
        Category category = createCategoryValid();

        Account accountOriginEntry = createAccountValid();
        Transaction transactionEntry =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOriginEntry)
                        .category(category)
                        .price(new BigDecimal(50.0))
                        .date(LocalDate.now())
                        .type(TypeTransaction.ENTRADA)
                        .build();
        underTest.save(transactionEntry);

        Account accountOriginOutput = createAccountValid();
        Transaction transactionOutput =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOriginOutput)
                        .category(category)
                        .price(new BigDecimal(50.0))
                        .date(LocalDate.now())
                        .type(TypeTransaction.SAIDA)
                        .build();
        underTest.save(transactionOutput);

        CashFlowFilter filter = new CashFlowFilter();
        filter.setMonth(""+LocalDate.now().getMonthValue());
        filter.setYear(""+LocalDate.now().getYear());
        filter.setAccounts(List.of(accountOriginEntry.getId()));
        List<Transaction> transactionsAccountEntry = underTest.listTransactionsByFilterBalance(filter);
        assertThat(transactionsAccountEntry.size()).isEqualTo(1);
    }

    private Category createCategoryValid() {
        Category category =
                Category.builder()
                        .name("Teste")
                        .build();
        return categoryService.save(category);
    }

    private Account createAccountValid() {
        Account account =
                Account.builder()
                        .id(1l)
                        .number("123")
                        .agency("12")
                        .bank("Teste")
                        .type(TypeAccount.CONTA_CORRENTE)
                        .build();
        return accountService.save(account);
    }

    private void authenticate() {
        User user = userService.save(getValidLoginUser());
        TestSecurityContextHolder
                .getContext()
                .setAuthentication(new TestingAuthenticationToken(user.getUsername(), new ArrayList<GrantedAuthority>()));

    }

    private User getValidLoginUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setPassword("P4ssword");
        return user;
    }

}
