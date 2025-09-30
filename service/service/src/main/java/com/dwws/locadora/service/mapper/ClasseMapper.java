package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Classe;
import com.dwws.locadora.service.dto.ClasseDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe>{
    @Override
    ClasseDTO toDto(Classe classe);

    @Override
    @InheritInverseConfiguration
    Classe toEntity(ClasseDTO dto);
}
