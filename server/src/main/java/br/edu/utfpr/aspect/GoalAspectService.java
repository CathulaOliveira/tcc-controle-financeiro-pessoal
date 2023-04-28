package br.edu.utfpr.aspect;

import br.edu.utfpr.model.Goal;
import br.edu.utfpr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class GoalAspectService {

    private final UserService userService;

    @Before(value = "execution(* br.edu.utfpr.service.impl.GoalServiceImpl.save(..)) && args(goal)")
    public void beforeGoalSave(JoinPoint joinPoint, Goal goal) {
        goal.setUser(userService.getUserLogged());
    }
}
