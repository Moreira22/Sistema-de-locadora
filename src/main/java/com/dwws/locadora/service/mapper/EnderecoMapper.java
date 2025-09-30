package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.service.dto.EnderecoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EnderecoMapper extends EntityMapper<EnderecoDTO, Endereco>{
    @Override
    EnderecoDTO toDto(Endereco entity);

    @Override
    @InheritInverseConfiguration
    Endereco toEntity(EnderecoDTO dto);
}
