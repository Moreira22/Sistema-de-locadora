package com.dwws.locadora.service.mapper;
import com.dwws.locadora.domain.Dependente;
import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.service.dto.DependenteDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface DependenteMapper extends EntityMapper<DependenteDTO, Dependente> {
    @Override
    @Mapping(source = "perfil.id", target = "idPerfil")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "socio.id" , target = "idSocio")
    DependenteDTO toDto(Dependente entity);

    @Override
    @Mapping(target = "socio", source = "idSocio", qualifiedByName = "mapSocio")
    Dependente toEntity(DependenteDTO dto);

    @Named("mapSocio")
    default Usuario mapSocio(Long idSocio) {
        if (idSocio == null) return null;
        return new Usuario(idSocio); // cria referencia sem buscar no banco
    }


}
