package com.dwws.locadora.service.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TituloDTO implements Serializable{
    private Long id;
    private Integer ano;
    private String sinopse;
    private String nome;
    private byte[] imagem;
    private ClasseDTO classe;
    private CategoriaDTO categoria;
}
