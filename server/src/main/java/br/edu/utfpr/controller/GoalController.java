package br.edu.utfpr.controller;

import br.edu.utfpr.model.Goal;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("goals")
@RequiredArgsConstructor
public class GoalController extends CrudController<Goal, Long> {

    private final GoalService goalService;

    @Override
    protected CrudService<Goal, Long> getService() {
        return this.goalService;
    }
}