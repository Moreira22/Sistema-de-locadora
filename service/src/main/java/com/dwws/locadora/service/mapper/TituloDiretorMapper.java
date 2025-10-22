package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.TituloDiretor;
import com.dwws.locadora.service.dto.TituloDiretorDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TituloDiretorMapper extends EntityMapper<TituloDiretorDTO, TituloDiretor> {
    @Override
    @Mapping(source = "titulo", target = "titulo")
    @Mapping(source = "diretor", target = "diretor")
    TituloDiretorDTO toDto(TituloDiretor tituloAtor);

    @Override
    @InheritInverseConfiguration
    TituloDiretor toEntity(TituloDiretorDTO tituloDTO);
}
