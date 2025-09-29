package com.dwws.locadora.service;

import com.dwws.locadora.domain.Cidade;
import com.dwws.locadora.domain.Endereco;
import com.dwws.locadora.domain.Estado;
import com.dwws.locadora.repository.CidadeRepository;
import com.dwws.locadora.repository.EnderecoRepository;
import com.dwws.locadora.repository.EstadoRepositopy;
import com.dwws.locadora.service.dto.CidadeDTO;
import com.dwws.locadora.service.dto.EnderecoDTO;
import com.dwws.locadora.service.dto.EstadoDTO;
import com.dwws.locadora.service.mapper.CidadeMappper;
import com.dwws.locadora.service.mapper.EnderecoMapper;
import com.dwws.locadora.service.mapper.EstadoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EnderecoService {
    private final EnderecoMapper enderecoMapper;
    private final EstadoMapper estadoMapper;
    private final CidadeMappper  cidadeMappper;
    private final EnderecoRepository  enderecoRepository;
    private final EstadoRepositopy   estadoRepositopy;
    private final CidadeRepository cidadeRepository;

    public Endereco findEntity(Long id){
        return enderecoRepository.findById(id).orElse(null);
    }

    public Estado findEntityEstado(Long id){
        return estadoRepositopy.findById(id).orElse(null);
    }

    public Cidade findEntityCiadate(Long id){
        return cidadeRepository.findById(id).orElse(null);
    }

    public EnderecoDTO findByID(Long id){ return enderecoMapper.toDto(findEntity(id)); }
    public EstadoDTO findByIDEstado(Long id){ return estadoMapper.toDto(findEntityEstado(id)); }
    public CidadeDTO findByIDCidade(Long id){ return cidadeMappper.toDto(findEntityCiadate(id)); }

    public EnderecoDTO save(EnderecoDTO dto) {
        return enderecoMapper.toDto(enderecoRepository.save(enderecoMapper.toEntity(dto)));
    }
}
