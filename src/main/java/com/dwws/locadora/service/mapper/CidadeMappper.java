package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Cidade;
import com.dwws.locadora.service.dto.CidadeDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CidadeMappper extends EntityMapper<CidadeDTO, Cidade > {
    @Override
    @Mapping(source = "estado.id", target = "estadoId")
    CidadeDTO toDto(Cidade entity);


    @Override
    @InheritInverseConfiguration
    Cidade toEntity(CidadeDTO cidadeDTO);
}
