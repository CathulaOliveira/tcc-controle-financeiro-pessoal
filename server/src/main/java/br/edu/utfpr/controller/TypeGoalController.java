package br.edu.utfpr.controller;

import br.edu.utfpr.model.TypeGoal;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.TypeGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("type-goal")
@RequiredArgsConstructor
public class TypeGoalController  extends CrudController<TypeGoal, Long>{

    private final TypeGoalService typeGoalService;

    @Override
    protected CrudService<TypeGoal, Long> getService() {
        return typeGoalService;
    }
}
