package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.service.dto.TituloDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TituloMapper extends EntityMapper<TituloDTO, Titulo> {
    @Override
    @Mapping(source = "categoria", target = "categoria")
    @Mapping(source = "classe", target = "classe")
    TituloDTO toDto(Titulo titulo);

    @Override
    @InheritInverseConfiguration
    Titulo toEntity(TituloDTO tituloDTO);
}
