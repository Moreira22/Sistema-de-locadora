package com.dwws.locadora.service;

import com.dwws.locadora.domain.Diretor;
import com.dwws.locadora.repository.DiretorRepository;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.mapper.DiretorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiretorService {
    private final DiretorMapper mapper;
    private final DiretorRepository repository;

    public Diretor findEntity(Long id){ return repository.findById(id).orElse(null); }

    public DiretorDTO indByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<DiretorDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public DiretorDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public DiretorDTO save(DiretorDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
