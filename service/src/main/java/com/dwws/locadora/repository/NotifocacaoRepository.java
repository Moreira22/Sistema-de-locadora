package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotifocacaoRepository  extends JpaRepository<Notificacao, Long>{
    List<Notificacao> findAllByUsuario_Id(Long usuarioId);
    
}
