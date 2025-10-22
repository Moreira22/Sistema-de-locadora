package com.dwws.locadora.service.dto;
import com.dwws.locadora.service.util.MensagemUsuarioUtil;
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
public class CreateUsuarioDTO implements Serializable{
    private UsuarioDTO usuario;
    private EnderecoDTO endereco;
}
