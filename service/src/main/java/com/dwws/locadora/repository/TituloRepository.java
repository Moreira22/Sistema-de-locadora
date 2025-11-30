package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Titulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TituloRepository  extends JpaRepository<Titulo, Long>{
    List<Titulo> findAllByCategoria_Id(Long categoriaId);

    List<Titulo> findAllByClasse_Id(Long classeId);
}
