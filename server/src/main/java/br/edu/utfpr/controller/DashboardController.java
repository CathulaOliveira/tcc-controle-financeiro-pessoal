package br.edu.utfpr.controller;

import br.edu.utfpr.filter.DashboardFilter;
import br.edu.utfpr.model.Dashboard;
import br.edu.utfpr.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @PostMapping()
    public Dashboard getDashboard(@RequestBody DashboardFilter filter) {
        return dashboardService.getDashboard(filter);
    }
}
