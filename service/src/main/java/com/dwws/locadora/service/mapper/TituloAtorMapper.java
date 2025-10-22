package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.TituloAtor;
import com.dwws.locadora.service.dto.TituloAtorDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TituloAtorMapper extends EntityMapper<TituloAtorDTO, TituloAtor> {
    @Override
    @Mapping(source = "titulo", target = "titulo")
    @Mapping(source = "ator", target = "ator")
    TituloAtorDTO toDto(TituloAtor tituloAtor);

    @Override
    @InheritInverseConfiguration
    TituloAtor toEntity(TituloAtorDTO tituloDTO);
}
