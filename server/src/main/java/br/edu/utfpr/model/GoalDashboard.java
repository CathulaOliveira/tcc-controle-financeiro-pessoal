package br.edu.utfpr.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class GoalDashboard {

    private BigDecimal percentage;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal price;
    private List<GoalTransaction> transactions;
}
