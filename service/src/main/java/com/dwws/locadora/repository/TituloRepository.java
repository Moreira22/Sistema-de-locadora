package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.service.dto.ListagemTitulosProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TituloRepository  extends JpaRepository<Titulo, Long>{
    List<Titulo> findAllByCategoria_Id(Long categoriaId);

    List<Titulo> findAllByClasse_Id(Long classeId);

    @Query("""
    SELECT
        t.id AS id,
        t.nome AS tituloNome,
        t.ano AS tituloAno,
        t.sinopse AS sinopse,
        t.imagem AS imagem,

        t.categoria.id AS categoriaId,
        t.categoria.nome AS categoriaNome,

        t.classe.id AS classeId,
        t.classe.nome AS classeNome,
        t.classe.valor AS classeValor,
        t.classe.prazoDevolucao AS classePrazoDevolucao,

        (SELECT STRING_AGG(d.nome, ', ')
         FROM TituloDiretor td
         JOIN Diretor d ON d.id = td.diretor.id
         WHERE td.titulo.id = t.id
        ) AS diretores,

        (SELECT STRING_AGG(a.nome, ', ')
         FROM TituloAtor ta
         JOIN Ator a ON a.id = ta.ator.id
         WHERE ta.titulo.id = t.id
        ) AS atores,

        (SELECT COUNT(i)
         FROM Item i
         WHERE i.titulo.id = t.id
           AND i.status = 'DISPONIVEL'
        ) AS totalItens,

        (SELECT STRING_AGG(CAST(i.numeroSerie AS string), ',')
         FROM Item i
         WHERE i.titulo.id = t.id
           AND i.status = 'DISPONIVEL'
        ) AS itensIds

    FROM Titulo t
    WHERE
        EXISTS (
            SELECT 1 FROM Item i
            WHERE i.titulo.id = t.id
            AND i.status = 'DISPONIVEL'
        )
    ORDER BY t.id
""")
    List<ListagemTitulosProjection> listagemTitulos();

}
