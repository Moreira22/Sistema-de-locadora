package com.dwws.locadora.domain.enums;

public enum StatusItem {
    DISPONIVEL(1),
    LOCADO(2),
    RESERVADO(3),
    DANIFICADO(4),
    PERDIDO(5);

    private final int codigo;

    StatusItem(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public static StatusItem fromCodigo(int codigo) {
        for (StatusItem status : values()) {
            if (status.getCodigo() == codigo) {
                return status;
            }
        }
        throw new IllegalArgumentException("Código inválido: " + codigo);
    }
}

