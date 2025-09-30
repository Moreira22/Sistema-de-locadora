package com.dwws.locadora.domain.enums;

public enum StatusLocacao {
    ABERTA(1),        // Locação criada
    EM_ANDAMENTO(2),  // Cliente está com o item no prazo
    ATRASADA(3),      // Cliente não devolveu no prazo
    ENCERRADA(4),     // Item devolvido, locação finalizada
    CANCELADA(5);     // Locação cancelada antes da retirada

    private final int codigo;

    StatusLocacao(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public static StatusLocacao fromCodigo(int codigo) {
        for (StatusLocacao status : values()) {
            if (status.getCodigo() == codigo) {
                return status;
            }
        }
        throw new IllegalArgumentException("Código inválido: " + codigo);
    }
}
