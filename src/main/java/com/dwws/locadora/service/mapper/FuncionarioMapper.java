package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.service.dto.FuncionarioDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FuncionarioMapper extends EntityMapper<FuncionarioDTO, Funcionario> {
    @Override
    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco.id", target = "enderecoId")
    FuncionarioDTO toDto(Funcionario funcionario);

    @Override
    @InheritInverseConfiguration
    Funcionario toEntity(FuncionarioDTO funcionarioDTO);

}
