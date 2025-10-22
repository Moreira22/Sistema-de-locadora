package com.dwws.locadora.repository;

import com.dwws.locadora.domain.TituloAtor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TituloAtorRepository extends JpaRepository<TituloAtor, Long>{
}
