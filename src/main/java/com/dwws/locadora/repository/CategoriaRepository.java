package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Categoria;
import com.dwws.locadora.service.dto.CategoriaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    @Query("SELECT NEW com.dwws.locadora.service.dto.CategoriaDTO(c.id, c.nome)"+
            "FROM Categoria c")
    List<CategoriaDTO> listAll();

    Optional<Categoria> findByNome(String nome);

}
