package com.dwws.locadora.service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

public class FuncionarioDTO extends UsuarioDTO implements Serializable {
    private String cargo;
    private Double salario;
    private LocalDate dataAdmissao;
    private LocalDate dataDemissao;
}
