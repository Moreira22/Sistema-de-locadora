package com.dwws.locadora.service.mapper;
import com.dwws.locadora.domain.Dependente;
import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.domain.Perfil;
import com.dwws.locadora.domain.Socio;
import com.dwws.locadora.service.dto.DependenteDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DependenteMapper extends EntityMapper<DependenteDTO, Dependente> {
    @Override
    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "socio.id" , target = "idSocio")
    DependenteDTO toDto(Dependente entity);

    default Dependente toEntity(DependenteDTO dto) {
        if (dto == null) return null;

        Dependente f = new Dependente();
        f.setId(dto.getId());
        f.setNome(dto.getNome());
        f.setCpf(dto.getCpf());
        f.setEmail(dto.getEmail());
        f.setLogin(dto.getLogin());
        f.setSenha(dto.getSenha());
        f.setTelefone(dto.getTelefone());
        f.setAtivo(dto.getAtivo());

        if (dto.getIdSocio() != null) {
            f.setSocio(new Socio());
            f.getSocio().setId(dto.getIdSocio());
        }

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
    }

}
