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
public class TituloAtorDTO implements Serializable{
    private  TituloDTO titulo;
    private AtorDTO ator;
}
