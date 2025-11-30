package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.service.dto.EnderecoDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {DependenteMapper.class})
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    @Override
    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "dependentes", target = "dependentes")
    UsuarioDTO toDto(Usuario entity);

    @Override
    @InheritInverseConfiguration
    Usuario toEntity(UsuarioDTO dto);

    @Named("toEnderecoDTO")
    default EnderecoDTO toEnderecoDTO(Endereco endereco) {
        if (endereco == null) return null;
        EnderecoDTO dto = new EnderecoDTO();
        dto.setId(endereco.getId());
        dto.setRua(endereco.getRua());
        dto.setNumero(endereco.getNumero());
        dto.setBairro(endereco.getBairro());
        dto.setCep(endereco.getCep());
        dto.setCidade(endereco.getCidade());
        dto.setUF(endereco.getUF());
        return dto;
    }

    @Named("toEnderecoEntity")
    default Endereco toEnderecoEntity(EnderecoDTO dto) {
        if (dto == null) return null;
        Endereco endereco = new Endereco();
        endereco.setId(dto.getId());
        endereco.setRua(dto.getRua());
        endereco.setNumero(dto.getNumero());
        endereco.setBairro(dto.getBairro());
        endereco.setCep(dto.getCep());
        endereco.setCidade(dto.getCidade());
        endereco.setUF(dto.getUF());
        return endereco;
    }
}

