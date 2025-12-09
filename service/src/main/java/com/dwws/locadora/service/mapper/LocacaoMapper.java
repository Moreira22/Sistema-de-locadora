package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.service.dto.LocacaoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LocacaoMapper extends EntityMapper<LocacaoDTO, Locacao> {
    @Override
    @Mapping(source = "usuario.id", target = "clienteId")
    @Mapping(source = "dependente.id", target = "dependenteId")
    @Mapping(source = "item", target = "item")
    LocacaoDTO toDto(Locacao locacao);

    @Override
    @InheritInverseConfiguration
    Locacao toEntity(LocacaoDTO locacaoDTO);
}
