package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Item;
import com.dwws.locadora.service.dto.ItemDTO;
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
    @Query("SELECT NEW com.dwws.locadora.service.dto.ItemDTO(i.id, " +
            "i.numeroSerie, i.dataAquisicao, i.titulo.id, i.status)"+
            "FROM Item i")
    List<ItemDTO> listAll();

    List<Item> findAllByTitulo_Id(Long tituloId);
}
