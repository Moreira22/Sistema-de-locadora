package com.dwws.locadora.service;
import com.dwws.locadora.domain.Ator;
import com.dwws.locadora.repository.AtorRepository;
import com.dwws.locadora.service.dto.AtorDTO;
import com.dwws.locadora.service.mapper.AtorMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AtorService {
    private final AtorMapper mapper;
    private final AtorRepository repository;

    public Ator findEntity(Long id){ return repository.findById(id).orElse(null); }

    public AtorDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<AtorDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public AtorDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public AtorDTO save(AtorDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
