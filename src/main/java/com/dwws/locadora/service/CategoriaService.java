package com.dwws.locadora.service;
import com.dwws.locadora.domain.Categoria;
import com.dwws.locadora.repository.CategoriaRepository;
import com.dwws.locadora.service.dto.CategoriaDTO;
import com.dwws.locadora.service.mapper.CategoriaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoriaService {
    private final CategoriaMapper mapper;
    private final CategoriaRepository repository;

    public Categoria findEntity(Long id){ return repository.findById(id).orElse(null); }

    public CategoriaDTO indByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<CategoriaDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public CategoriaDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public CategoriaDTO save(CategoriaDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
