package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.service.dto.TituloListDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TituloMapper extends EntityMapper<TituloListDTO, Titulo> {
    @Override
    @Mapping(source = "categoria.id", target = "categoriaId")
    @Mapping(source = "classe.id", target = "classeId")
    TituloListDTO toDto(Titulo titulo);

    @Override
    @InheritInverseConfiguration
    Titulo toEntity(TituloListDTO tituloDTO);
}
