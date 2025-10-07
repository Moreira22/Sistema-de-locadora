package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.service.dto.TituloDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TituloRepository  extends JpaRepository<Titulo, Long>{
    @Query("""
    SELECT NEW com.dwws.locadora.service.dto.TituloDTO(
        t.id,t.ano, t.sinopse,t.nome, t.imagem, t.classe.id, t.categoria.id, t.classe.nome,
        t.categoria.nome
    )
    FROM Titulo t
    """)
    List<TituloDTO> listAll();


    List<Titulo> findAllByCategoria_Id(Long categoriaId);

    List<Titulo> findAllByClasse_Id(Long classeId);
}
