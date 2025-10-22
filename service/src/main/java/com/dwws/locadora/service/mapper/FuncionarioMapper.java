package com.dwws.locadora.service.mapper;
import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.domain.Item;
import com.dwws.locadora.domain.Perfil;
import com.dwws.locadora.service.dto.FuncionarioDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FuncionarioMapper {

    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco.id", target = "idEndereco")
    FuncionarioDTO toDto(Funcionario funcionario);


    default Funcionario toEntity(FuncionarioDTO dto) {
        if (dto == null) return null;

        Funcionario f = new Funcionario();
        f.setId(dto.getId());
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
        f.setCargo(dto.getCargo());
        f.setSalario(dto.getSalario());
        f.setDataAdmissao(dto.getDataAdmissao());
        f.setDataDemissao(dto.getDataDemissao());

        return f;
    }
}
