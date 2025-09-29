package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.domain.Item;
import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.service.dto.LocacaoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long>{
    @Query("SELECT NEW com.dwws.locadora.service.dto.LocacaoDTO(l.id, " +
            "l.dataLocaoa, l.dataPervista, l.dataDevolucao, l.multa, " +
            "l.valor, l.status, l.usuario.id, l.item.id)"+
            "FROM Locacao l")
    Page<LocacaoDTO> listAll(Pageable pageable);
}
