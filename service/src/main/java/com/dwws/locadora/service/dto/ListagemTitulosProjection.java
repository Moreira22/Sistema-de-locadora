package com.dwws.locadora.service.dto;

public interface ListagemTitulosProjection {
    Long getId();
    String getTituloNome();
    Integer getTituloAno();
    String getSinopse();
    byte[] getImagem();

    Long getCategoriaId();
    String getCategoriaNome();

    Long getClasseId();
    String getClasseNome();
    Integer getClasseValor();
    Integer getClassePrazoDevolucao();

    String getDiretores();
    String getAtores();

    String getItensIds();
    Integer getTotalItens();
}
