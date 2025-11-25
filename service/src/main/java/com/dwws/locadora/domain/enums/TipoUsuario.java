package com.dwws.locadora.domain.enums;

public enum TipoUsuario {
    FUNCIONARIO(1),
    ADMINISTRATRADOR(2),
    CLIENTE(3),
    DEPENDENTE(4);

    private final int codigo;

    TipoUsuario(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public static TipoUsuario fromCodigo(int codigo) {
        for (TipoUsuario tipo : values()) {
            if (tipo.getCodigo() == codigo) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("Código inválido: " + codigo);
    }
}
