package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.RecurringTransactionRepository;
import br.edu.utfpr.service.RecurringTransactionService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecurringTransactionServiceImpl
        extends CrudServiceImpl<RecurringTransaction, Long>
        implements RecurringTransactionService {

    private final RecurringTransactionRepository recurringTransactionRepository;
    private final UserService userService;

    @Override
    protected JpaRepository<RecurringTransaction, Long> getRepository() {
        return this.recurringTransactionRepository;
    }

    public List<RecurringTransaction> findByUserLogged() {
        User userLogged = userService.getUserLogged();
        return recurringTransactionRepository.findByAccountOrigin_User_IdOrAccountDestination_User_Id(userLogged.getId(), userLogged.getId());
    }
}
