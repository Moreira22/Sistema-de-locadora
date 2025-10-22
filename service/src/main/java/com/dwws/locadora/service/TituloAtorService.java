package com.dwws.locadora.service;

import com.dwws.locadora.domain.Ator;
import com.dwws.locadora.domain.TituloAtor;
import com.dwws.locadora.domain.TituloDiretor;
import com.dwws.locadora.repository.TituloAtorRepository;
import com.dwws.locadora.repository.TituloDiretorRepository;
import com.dwws.locadora.service.dto.AtorDTO;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.dto.TituloAtorDTO;
import com.dwws.locadora.service.dto.TituloDiretorDTO;
import com.dwws.locadora.service.dto.TituloListDTO;
import com.dwws.locadora.service.mapper.TituloAtorMapper;
import com.dwws.locadora.service.mapper.TituloDiretorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class TituloAtorService {
    private final AtorService atorService;
    private final TituloAtorRepository repository;
    private final TituloAtorMapper  mapper;

    public TituloAtorDTO save(TituloAtorDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public TituloAtor findEntity(Long id){ return repository.findById(id).orElse(null); }

    public TituloAtorDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public void cadastraTituloAtor(TituloListDTO tituloDTO, List<Long> idsAtores) {
        for (Long idAtor : idsAtores) {
            // Corrigido nome do método para "findById"
            AtorDTO atorDTO = atorService.findById(idAtor);

            // Cria a associação entre título e ator
            TituloAtorDTO tituloAtorDTO = new TituloAtorDTO();
            tituloAtorDTO.setTitulo(tituloDTO);
            tituloAtorDTO.setAtor(atorDTO);

            // Persiste a associação
            save(tituloAtorDTO);
        }
    }


}
