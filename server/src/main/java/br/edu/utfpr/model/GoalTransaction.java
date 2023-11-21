package br.edu.utfpr.model;

import br.edu.utfpr.enums.TypeTransaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalTransaction {

    private LocalDate data;
    private BigDecimal valor;
    private TypeTransaction typeTransaction;
    private TypeTransaction typeGoal;
}
