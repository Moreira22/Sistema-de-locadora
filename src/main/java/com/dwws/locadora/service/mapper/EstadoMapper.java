package com.dwws.locadora.service.mapper;


import com.dwws.locadora.domain.Estado;
import com.dwws.locadora.service.dto.EstadoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EstadoMapper extends EntityMapper<EstadoDTO, Estado> {
    @Override
    EstadoDTO toDto(Estado estado);
    @Override
    @InheritInverseConfiguration
    Estado toEntity(EstadoDTO estadoDTO);
}
