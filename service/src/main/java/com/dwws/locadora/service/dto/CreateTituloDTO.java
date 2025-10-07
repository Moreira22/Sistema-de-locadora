package com.dwws.locadora.service.dto;
import com.dwws.locadora.domain.enums.StatusItem;
import com.dwws.locadora.domain.enums.StatusLocacao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTituloDTO implements Serializable{
    private TituloDTO titulo;
    private List<ItemDTO> itemList;
}
