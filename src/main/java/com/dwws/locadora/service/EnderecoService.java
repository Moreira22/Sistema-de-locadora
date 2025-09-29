package com.dwws.locadora.service;

import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.repository.EnderecoRepository;
import com.dwws.locadora.service.dto.EnderecoDTO;
import com.dwws.locadora.service.mapper.EnderecoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EnderecoService {
    private final EnderecoMapper enderecoMapper;
    private final EnderecoRepository  enderecoRepository;

    public Endereco findEntity(Long id){
        return enderecoRepository.findById(id).orElse(null);
    }

    public EnderecoDTO findByID(Long id){ return enderecoMapper.toDto(findEntity(id)); }

    public EnderecoDTO save(EnderecoDTO dto) {
        return enderecoMapper.toDto(enderecoRepository.save(enderecoMapper.toEntity(dto)));
    }
}
