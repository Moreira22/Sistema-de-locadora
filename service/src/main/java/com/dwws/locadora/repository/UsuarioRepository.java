package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.service.dto.UsuarioListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT NEW com.dwws.locadora.service.dto.UsuarioListDTO(" +
            " u.id, u.login, u.cpf, u.nome, " +
            " u.perfil.id, u.perfil.descricao, u.ativo, u.telefone, u.email, " +
            " NEW com.dwws.locadora.service.dto.EnderecoDTO(" +
            "    u.endereco.id, u.endereco.rua, u.endereco.numero, u.endereco.bairro, " +
            "    u.endereco.cep, u.endereco.cidade, u.endereco.UF" +
            " )) " +
            " FROM Usuario u WHERE u.ativo = true")
    Page<UsuarioListDTO> listAll(Pageable pageable);

    @Query("SELECT u FROM Usuario u WHERE u.login = :login")
    Optional<Usuario> findByLogin(@Param("login") String login);

    @Query("SELECT u FROM Usuario u WHERE u.nome = :nome")
    Optional<Usuario> findByNome(@Param("nome") String nome);

    @Query("SELECT u FROM Usuario u WHERE u.perfil.id = 3")
    List<Usuario> listAllCliente();
}
