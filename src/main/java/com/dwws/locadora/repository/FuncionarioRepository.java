package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.service.dto.FuncionarioProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
    @Query("SELECT u.id as id, u.login as login, u.cpf as cpf, u.nome as nome, " +
            "u.perfil.id as perfilId, u.perfil.descricao as perfilDescricao, " +
            "u.ativo as ativo, u.cargo as cargo, u.salario as salario, " +
            "u.dataAdmissao as dataAdmissao, u.dataDemissao as dataDemissao " +
            "FROM Funcionario u WHERE u.ativo = true")
    Page<FuncionarioProjection> listAll(Pageable pageable);

    Optional<Funcionario> findByLogin(String login);
    Optional<Funcionario> findByCpf(String cpf);

}
