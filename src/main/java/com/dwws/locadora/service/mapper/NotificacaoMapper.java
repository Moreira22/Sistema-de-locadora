package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Notificacao;
import com.dwws.locadora.service.dto.NotificacaoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificacaoMapper extends EntityMapper<NotificacaoDTO, Notificacao> {
    @Override
    @Mapping(source = "usuario.id", target = "usuarioId")
    NotificacaoDTO toDto(Notificacao notificacao);

    @Override
    @InheritInverseConfiguration
    Notificacao toEntity(NotificacaoDTO notificacaoDTO);
}
