package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Classe;
import com.dwws.locadora.domain.Diretor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiretorRepository  extends JpaRepository<Diretor, Long>{
}
