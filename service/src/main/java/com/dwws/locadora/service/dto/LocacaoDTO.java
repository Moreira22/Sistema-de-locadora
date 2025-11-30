package com.dwws.locadora.service.dto;
import com.dwws.locadora.domain.enums.StatusLocacao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocacaoDTO implements Serializable{
    private Long id;
    private LocalDate dataLocaoa;
    private LocalDate dataPervista;
    private LocalDate dataDevolucao;
    private Float multa;
    private Double valor;
    private StatusLocacao status;
    private Boolean ativo;
    private UsuarioDTO usuario;
    private ItemDTO item;
}
