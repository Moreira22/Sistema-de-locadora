package com.dwws.locadora.service;

import com.dwws.locadora.domain.Notificacao;
import com.dwws.locadora.repository.NotifocacaoRepository;
import com.dwws.locadora.service.dto.NotificacaoDTO;
import com.dwws.locadora.service.mapper.NotificacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NotifocacaoService {
    private final NotificacaoMapper mapper;
    private final NotifocacaoRepository repository;

    public Notificacao findEntity(Long id){ return repository.findById(id).orElse(null); }

    public NotificacaoDTO indByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<NotificacaoDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public NotificacaoDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public NotificacaoDTO save(NotificacaoDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
