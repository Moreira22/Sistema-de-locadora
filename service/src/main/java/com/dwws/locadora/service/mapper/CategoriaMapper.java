package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Categoria;
import com.dwws.locadora.service.dto.CategoriaDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoriaMapper extends EntityMapper<CategoriaDTO, Categoria> {
    @Override
    CategoriaDTO toDto(Categoria categoria);

    @Override
    @InheritInverseConfiguration
    Categoria toEntity(CategoriaDTO dto);

}
