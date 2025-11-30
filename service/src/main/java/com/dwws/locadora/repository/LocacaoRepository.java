package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long>{
    List<Locacao> findAllByAtivoTrue();



}
