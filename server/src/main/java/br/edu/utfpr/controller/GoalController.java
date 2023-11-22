package br.edu.utfpr.controller;

import br.edu.utfpr.model.Goal;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.impl.GoalServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("goals")
@RequiredArgsConstructor
public class GoalController extends CrudController<Goal, Long> {

    private final GoalServiceImpl goalService;

    @Override
    protected CrudService<Goal, Long> getService() {
        return this.goalService;
    }

    @GetMapping("find-by-user-logged")
    public List<Goal> findByUserLogged() {
        return this.goalService.findByUserLogged();
    }

    @GetMapping("get-average-value/{categoryId}")
    public BigDecimal getAverageValue(@PathVariable Long categoryId) {
        return this.goalService.getAverageValue(categoryId);
    }
}