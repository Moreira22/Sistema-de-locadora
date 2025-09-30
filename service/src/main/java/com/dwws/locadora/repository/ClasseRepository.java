package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Classe;
import com.dwws.locadora.service.dto.ClasseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long>{
    @Query("SELECT NEW com.dwws.locadora.service.dto.ClasseDTO(c.id, c.nome, c.valor, c.prazoDevolucao)"+
            "FROM Classe c")
    List<ClasseDTO> listAll();

    Optional<Classe> findByNome(String nome);

}
