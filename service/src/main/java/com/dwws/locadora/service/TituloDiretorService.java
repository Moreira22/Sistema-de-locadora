package com.dwws.locadora.service;

import com.dwws.locadora.domain.TituloDiretor;
import com.dwws.locadora.repository.TituloDiretorRepository;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.dto.TituloDiretorDTO;
import com.dwws.locadora.service.dto.TituloListDTO;
import com.dwws.locadora.service.mapper.TituloDiretorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class TituloDiretorService {
    private final DiretorService diretorService;
    private final TituloDiretorRepository repository;
    private final TituloDiretorMapper  mapper;

    public TituloDiretorDTO save(TituloDiretorDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public TituloDiretor findEntity(Long id){ return repository.findById(id).orElse(null); }

    public TituloDiretorDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public void cadastraTituloDiretro(TituloListDTO tituloDTO, Long idDiretor){
        DiretorDTO diretorDTO = diretorService.findByID(idDiretor);
        TituloDiretorDTO tituloDiretortDTO = new TituloDiretorDTO();
        tituloDiretortDTO.setTitulo(tituloDTO);
        tituloDiretortDTO.setDiretor(diretorDTO);
        save(tituloDiretortDTO);
    }
}
