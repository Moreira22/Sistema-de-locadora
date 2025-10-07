package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Item;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.ItemListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{
    @Query("""
    SELECT new com.dwws.locadora.service.dto.ItemListDTO(
        i.id,
        i.numeroSerie,
        i.dataAquisicao,
        new com.dwws.locadora.service.dto.TituloDTO(
            t.id,
            t.ano,
            t.sinopse,
            t.nome,
            t.imagem,
            c.id,
            cat.id,
            c.nome,
            cat.nome
        ),
        i.status
    )
    FROM Item i
    JOIN i.titulo t
    JOIN t.classe c
    JOIN t.categoria cat""")
    List<ItemListDTO> findAllItens();


    List<Item> findAllByTitulo_Id(Long tituloId);
}
