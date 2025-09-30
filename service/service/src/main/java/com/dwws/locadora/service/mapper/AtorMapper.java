package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Ator;
import com.dwws.locadora.service.dto.AtorDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface AtorMapper extends EntityMapper<AtorDTO, Ator>{
    @Override
    AtorDTO toDto(Ator entity);

    @Override
    @InheritInverseConfiguration
    Ator toEntity(AtorDTO dto);
}
