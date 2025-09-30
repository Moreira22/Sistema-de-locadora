package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Diretor;
import com.dwws.locadora.service.dto.DiretorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiretorRepository  extends JpaRepository<Diretor, Long>{
    @Query("SELECT NEW com.dwws.locadora.service.dto.DiretorDTO(d.id, d.nome)"+
            "FROM Diretor d")
    Page<DiretorDTO> listAll(Pageable pageable);

    Optional<Diretor> findByNome(String nome);


}
