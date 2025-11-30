package com.dwws.locadora.service.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTituloDTO implements Serializable{
    private TituloDTO titulo;
    private List<ItemDTO> itemList;
    private Long classeId;
    private Long categoriaId;
    private Long diretorId;
    private List<Long> atoreIds;
}
