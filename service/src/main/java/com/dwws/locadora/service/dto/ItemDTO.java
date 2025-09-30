package com.dwws.locadora.service.dto;
import com.dwws.locadora.domain.enums.StatusItem;
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
public class ItemDTO implements Serializable{
    private Long id;
    private String numeroSerie;
    private LocalDate dataAquisicao;
    private Long tituloId;
    private StatusItem status;
}
