package com.dwws.locadora.service.dto;
import com.dwws.locadora.domain.enums.StatusItem;
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
public class ItemListDTO implements Serializable{
    private Long id;
    private String numeroSerie;
    private LocalDate dataAquisicao;
    private TituloListDTO titulo;
    private StatusItem status;
}
