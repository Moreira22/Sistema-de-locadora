package com.dwws.locadora.service;
import com.dwws.locadora.domain.Avaliacao;
import com.dwws.locadora.repository.AvaliacaoRepository;
import com.dwws.locadora.service.dto.AvaliacaoDTO;
import com.dwws.locadora.service.mapper.AvaliacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AvaliacaoService {
    private final AvaliacaoMapper mapper;
    private final AvaliacaoRepository repository;

    public Avaliacao findEntity(Long id){ return repository.findById(id).orElse(null); }

    public AvaliacaoDTO indByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<AvaliacaoDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public AvaliacaoDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public AvaliacaoDTO save(AvaliacaoDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
