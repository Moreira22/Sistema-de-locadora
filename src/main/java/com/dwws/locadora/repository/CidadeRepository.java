package com.dwws.locadora.repository;
import com.dwws.locadora.domain.Ator;
import com.dwws.locadora.domain.Cidade;
import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.service.dto.AtorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CidadeRepository extends JpaRepository<Cidade,Long> {
    Optional<Cidade> findByNome(String nome);

    List<Cidade> findAllByEstado_Id(Long id);

}
