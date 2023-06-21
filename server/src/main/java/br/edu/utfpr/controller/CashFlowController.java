package br.edu.utfpr.controller;

import br.edu.utfpr.filter.CashFlowFilter;
import br.edu.utfpr.model.CashFlow;
import br.edu.utfpr.service.CashFlowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cash-flow")
@RequiredArgsConstructor
public class CashFlowController {

    private final CashFlowService cashFlowService;

    @PostMapping()
    public CashFlow getCashFlow(@RequestBody CashFlowFilter filter) {
        return cashFlowService.getCashFlow(filter);
    }
}
