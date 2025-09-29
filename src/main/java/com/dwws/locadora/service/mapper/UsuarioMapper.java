package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.service.dto.UsuarioDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {
    @Override
    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco.id", target = "enderecoId")
    UsuarioDTO toDto(Usuario entity);

    @Override
    @InheritInverseConfiguration
    Usuario toEntity(UsuarioDTO dto);


}
