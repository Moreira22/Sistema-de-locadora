package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.service.dto.LocacaoListDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LocacaoMapper extends EntityMapper<LocacaoListDTO, Locacao> {
    @Override
    @Mapping(source = "item", target = "item")
    @Mapping(source = "usuario", target = "usuario")
    LocacaoListDTO toDto(Locacao locacao);

    @Override
    @InheritInverseConfiguration
    Locacao toEntity(LocacaoListDTO locacaoDTO);
}
