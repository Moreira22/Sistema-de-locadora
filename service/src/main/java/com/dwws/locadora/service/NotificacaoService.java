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

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificacaoService {
    private final NotificacaoMapper mapper;
    private final NotifocacaoRepository repository;

    public Notificacao findEntity(Long id){ return repository.findById(id).orElse(null); }

    public NotificacaoDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public List<NotificacaoDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto).toList();
    }

    public NotificacaoDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public NotificacaoDTO save(NotificacaoDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
