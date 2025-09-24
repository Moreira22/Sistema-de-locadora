package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.service.dto.EstadoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EstadoMappper extends EntityMapper<EstadoDTO, Endereco> {
    @Override
    Endereco toEntity(EstadoDTO estadoDTO);

    @Override
    @InheritInverseConfiguration
    EstadoDTO toDto(Endereco entity);
}
