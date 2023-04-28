package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Goal;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.GoalRepository;
import br.edu.utfpr.service.GoalService;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl
        extends CrudServiceImpl<Goal, Long>
        implements GoalService {

    private final GoalRepository goalRepository;
    private final UserService userService;

    @Override
    protected JpaRepository<Goal, Long> getRepository() {
        return this.goalRepository;
    }

    public List<Goal> findByUserId(long userId) {
        return goalRepository.findByUserId(userId);
    }

    public List<Goal> findByUserLogged() {
        User user = userService.getUserLogged();
        return findByUserId(user.getId());
    }

    // culpa do Aspect
    @Override
    public Goal save(Goal entity) {
        return super.save(entity);
    }
}
