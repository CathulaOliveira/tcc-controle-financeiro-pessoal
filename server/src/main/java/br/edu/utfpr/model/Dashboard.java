package br.edu.utfpr.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class Dashboard {

    private BigDecimal totalSaldo;
    private BigDecimal totalEntradas;
    private BigDecimal totalSaidas;
    private BigDecimal totalBalanco;
    private List<Chart> graficoPizza;
    private List<Chart> graficoColuna;
    private List<Chart> graficoLinha;
}
