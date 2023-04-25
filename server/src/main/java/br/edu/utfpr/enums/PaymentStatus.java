package br.edu.utfpr.enums;

public enum PaymentStatus {

    EFETUADO("Efetuado"),
    PENDENTE("Pendente");

    private String descricao;

    PaymentStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
