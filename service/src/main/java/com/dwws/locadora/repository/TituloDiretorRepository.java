package com.dwws.locadora.repository;

import com.dwws.locadora.domain.TituloDiretor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
public interface TituloDiretorRepository extends JpaRepository<TituloDiretor, Long> {
}
