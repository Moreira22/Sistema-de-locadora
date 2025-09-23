package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.domain.Item;
import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.domain.Notificacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotifocacaoRepository  extends JpaRepository<Notificacao, Long>{
}
