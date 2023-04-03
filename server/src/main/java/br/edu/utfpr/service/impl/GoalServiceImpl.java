package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.Goal;
import br.edu.utfpr.repository.GoalRepository;
import br.edu.utfpr.service.GoalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class GoalServiceImpl
        extends CrudServiceImpl<Goal, Long>
        implements GoalService {

    private GoalRepository goalRepository;

    public GoalServiceImpl(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    @Override
    protected JpaRepository<Goal, Long> getRepository() {
        return this.goalRepository;
    }
}
