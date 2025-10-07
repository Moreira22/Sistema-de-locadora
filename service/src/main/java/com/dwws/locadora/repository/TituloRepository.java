package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.service.dto.TituloListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TituloRepository  extends JpaRepository<Titulo, Long>{
    @Query("""
    SELECT NEW com.dwws.locadora.service.dto.TituloListDTO(
        t.id,t.ano, t.sinopse,t.nome, t.imagem, t.classe.id, t.categoria.id, t.classe.nome,
        t.categoria.nome
    )
    FROM Titulo t
    """)
    List<TituloListDTO> listAll();


    List<Titulo> findAllByCategoria_Id(Long categoriaId);

    List<Titulo> findAllByClasse_Id(Long classeId);
}
