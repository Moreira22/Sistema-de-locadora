package com.dwws.locadora.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SocioDTO extends UsuarioDTO implements Serializable{
    List<DependenteDTO> dependentes;
    private String senha;
}
