package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.service.dto.LocacaoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LocacaoMapper extends EntityMapper<LocacaoDTO, Locacao> {
    @Override
    @Mapping(source = "usuario", target = "usuario")
    @Mapping(source = "item", target = "item")
    LocacaoDTO toDto(Locacao locacao);

    @Override
    @InheritInverseConfiguration
    Locacao toEntity(LocacaoDTO locacaoDTO);
}
