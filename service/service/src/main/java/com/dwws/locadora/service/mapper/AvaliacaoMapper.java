package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Avaliacao;
import com.dwws.locadora.service.dto.AvaliacaoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AvaliacaoMapper extends EntityMapper<AvaliacaoDTO, Avaliacao> {
    @Override
    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "item.id", target = "itemId")
    AvaliacaoDTO toDto(Avaliacao avaliacao);

    @Override
    @InheritInverseConfiguration
    Avaliacao toEntity(AvaliacaoDTO dto);
}
