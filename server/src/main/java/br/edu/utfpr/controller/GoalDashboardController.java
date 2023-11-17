package br.edu.utfpr.controller;

import br.edu.utfpr.filter.DashboardFilter;
import br.edu.utfpr.model.Dashboard;
import br.edu.utfpr.model.GoalDashboard;
import br.edu.utfpr.service.DashboardService;
import br.edu.utfpr.service.GoalDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("goal-dashboard")
@RequiredArgsConstructor
public class GoalDashboardController {

    private final GoalDashboardService goalDashboardService;

    @GetMapping("/{goalId}")
    public GoalDashboard getDashboard(@PathVariable Long goalId) {
        return goalDashboardService.getGoalDashboard(goalId);
    }
}
