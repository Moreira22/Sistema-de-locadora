package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Item;
import com.dwws.locadora.service.dto.ItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.dwws.locadora.domain.enums.StatusItem;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{
    @Query("select i from Item i where i.status = 'DISPONIVEL'")
    List<Item> listItemsDisponiveis();

    List<Item> findAllByTitulo_Id(Long tituloId);
}
