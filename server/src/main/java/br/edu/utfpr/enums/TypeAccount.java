package br.edu.utfpr.enums;

public enum TypeAccount {

    CONTA_CORRENTE("Conta Corrente"),
    CONTA_POUPANCA("Conta Poupança"),
    CARTAO("Cartão");

    private String descricao;

    TypeAccount(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
