package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Ator;
import com.dwws.locadora.service.dto.AtorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AtorRepository  extends JpaRepository<Ator, Long> {
    @Query("SELECT NEW com.dwws.locadora.service.dto.AtorDTO(a.id, a.nome)"+
            "FROM Ator a")
    Page<AtorDTO> listAll(Pageable pageable);

    Optional<Ator> findByNome(String nome);

}
