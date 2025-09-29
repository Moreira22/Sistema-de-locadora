package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Avaliacao;
import com.dwws.locadora.service.dto.AvaliacaoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long>{
    @Query("SELECT NEW com.dwws.locadora.service.dto.AvaliacaoDTO(a.id, " +
            "a.estrelas,a.comentario,a.data,a.usuario.id,a.item.id)"+
            "FROM Avaliacao a")
    Page<AvaliacaoDTO> listAll(Pageable pageable);

    List<Avaliacao> findAllByUsuario_Id(Long usuarioId);

    List<Avaliacao> findAllByItem_Id(Long itemId);
}
