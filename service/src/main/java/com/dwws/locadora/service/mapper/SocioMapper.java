package com.dwws.locadora.service.mapper;
import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.domain.Perfil;
import com.dwws.locadora.domain.Socio;
import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.service.dto.SocioDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SocioMapper extends EntityMapper<SocioDTO, Socio>{
    @Override
    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "dependentes", target = "dependentes")
    SocioDTO toDto(Socio entity);

    @Override
    @InheritInverseConfiguration
    default Socio toEntity(SocioDTO dto){
        if (dto == null) return null;

        Socio f = new Socio();
        f.setNome(dto.getNome());
        f.setCpf(dto.getCpf());
        f.setEmail(dto.getEmail());
        f.setLogin(dto.getLogin());
        f.setSenha(dto.getSenha());
        f.setTelefone(dto.getTelefone());
        f.setAtivo(dto.getAtivo());

        if (dto.getIdPerfil() != null) {
            f.setPerfil(new Perfil(dto.getIdPerfil()));
        }

        if (dto.getEndereco() != null) {
            if (f.getEndereco() == null) {
                f.setEndereco(new Endereco());
            }

            f.getEndereco().setId(dto.getEndereco().getId());
            f.getEndereco().setRua(dto.getEndereco().getRua());
            f.getEndereco().setNumero(dto.getEndereco().getNumero());
            f.getEndereco().setBairro(dto.getEndereco().getBairro());
            f.getEndereco().setCep(dto.getEndereco().getCep());
            f.getEndereco().setCidade(dto.getEndereco().getCidade());
            f.getEndereco().setUF(dto.getEndereco().getUF());
        }

        return f;
    };

    default Socio toUsertoSocio(Usuario dto){
        if (dto == null) return null;

        Socio f = new Socio();
        f.setId(dto.getId());
        f.setNome(dto.getNome());
        f.setCpf(dto.getCpf());
        f.setEmail(dto.getEmail());
        f.setLogin(dto.getLogin());
        f.setSenha(dto.getSenha());
        f.setTelefone(dto.getTelefone());
        f.setAtivo(dto.getAtivo());

        if (dto.getPerfil() != null) {
            f.setPerfil(dto.getPerfil());
        }

        if (dto.getEndereco() != null) {
            if (f.getEndereco() == null) {
                f.setEndereco(new Endereco());
            }

            f.getEndereco().setId(dto.getEndereco().getId());
            f.getEndereco().setRua(dto.getEndereco().getRua());
            f.getEndereco().setNumero(dto.getEndereco().getNumero());
            f.getEndereco().setBairro(dto.getEndereco().getBairro());
            f.getEndereco().setCep(dto.getEndereco().getCep());
            f.getEndereco().setCidade(dto.getEndereco().getCidade());
            f.getEndereco().setUF(dto.getEndereco().getUF());
        }

        return f;
    };

}
