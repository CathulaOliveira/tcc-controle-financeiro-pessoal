package br.edu.utfpr.enums;

public enum TypeGoal {

    RESULTADO("Resultado"),
    DESEMPENHO("Desempenho"),
    PROCESSO("Processo");

    private String descricao;

    TypeGoal(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
