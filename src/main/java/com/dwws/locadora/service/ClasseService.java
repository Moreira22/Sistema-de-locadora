package com.dwws.locadora.service;
import com.dwws.locadora.domain.Classe;
import com.dwws.locadora.repository.ClasseRepository;
import com.dwws.locadora.service.dto.ClasseDTO;
import com.dwws.locadora.service.mapper.ClasseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClasseService {
    private final ClasseMapper mapper;
    private final ClasseRepository repository;

    public Classe findEntity(Long id){ return repository.findById(id).orElse(null); }

    public ClasseDTO indByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<ClasseDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public ClasseDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public ClasseDTO save(ClasseDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
