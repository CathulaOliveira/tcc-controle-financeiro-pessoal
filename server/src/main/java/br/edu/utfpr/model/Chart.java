package br.edu.utfpr.model;

import br.edu.utfpr.enums.TypeTransaction;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class Chart {

    private String label;
    private Long value;
    private BigDecimal valueDecimal;
    private BigDecimal totalEntradas;
    private BigDecimal totalSaidas;

    public Chart(String label, Long value) {
        this.label = label;
        this.value = value;
    }

    public Chart(TypeTransaction label, BigDecimal value) {
        this.label = label.getDescricao();
        this.valueDecimal = value;
    }


    public Chart(String label, Long totalEntradas, Long totalSaidas) {
        this.label = label;
        this.totalEntradas = new BigDecimal(totalEntradas);
        this.totalSaidas = new BigDecimal(totalSaidas);
    }

    public Chart(String label, BigDecimal totalEntradas, BigDecimal totalSaidas) {
        this.label = label;
        this.totalEntradas = totalEntradas;
        this.totalSaidas = totalSaidas;
    }
}
