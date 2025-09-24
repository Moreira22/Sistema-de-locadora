package com.dwws.locadora.service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoDTO implements Serializable{
    private Long id;
    private String rua;
    private String numero;
    private String bairro;
    private String cep;
    private Long cidadeId;
}
