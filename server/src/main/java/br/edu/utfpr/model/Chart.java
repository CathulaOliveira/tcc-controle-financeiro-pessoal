package br.edu.utfpr.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Chart {

    private String label;
    private BigDecimal value;
}
