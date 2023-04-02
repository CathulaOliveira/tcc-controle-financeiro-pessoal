package br.edu.utfpr.enums;

public enum TypeTransaction {

    ENTRADA("Entrada"),
    SAIDA("Saída"),
    TRANSFERENCIA("Transferência entre contas");

    private String descricao;

    TypeTransaction(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
