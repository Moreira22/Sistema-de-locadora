package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Diretor;
import com.dwws.locadora.service.dto.DiretorDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DiretorMapper extends EntityMapper<DiretorDTO, Diretor>{
    @Override
    DiretorDTO toDto(Diretor diretor);

    @Override
    @InheritInverseConfiguration
    Diretor toEntity(DiretorDTO diretorDTO);
}
