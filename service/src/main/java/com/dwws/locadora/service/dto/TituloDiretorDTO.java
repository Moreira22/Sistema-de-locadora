package com.dwws.locadora.service.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class TituloDiretorDTO implements Serializable{
    private  TituloListDTO titulo;
    private DiretorDTO diretor;
}

