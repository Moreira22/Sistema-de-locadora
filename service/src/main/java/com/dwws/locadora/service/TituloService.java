package com.dwws.locadora.service;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.repository.TituloAtorRepository;
import com.dwws.locadora.repository.TituloRepository;
import com.dwws.locadora.service.dto.CreateTituloDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.TituloListDTO;
import com.dwws.locadora.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TituloService {
    private final TituloMapper mapper;
    private final TituloRepository repository;
    private final ItemService itemService;
    private final TituloDiretorService tituloDiretorService;
    private final TituloAtorService tituloAtorService;

    public Titulo findEntity(Long id){ return repository.findById(id).orElse(null); }

    public TituloListDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public List<TituloListDTO> findAll() {
        return repository.listAll();
    }

    public TituloListDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public TituloListDTO save(TituloListDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    @Transactional
    public CreateTituloDTO saveTituloItem(CreateTituloDTO dto) {
        TituloListDTO tituloDTO = save(dto.getTitulo());

        List<ItemDTO> savedItems = new ArrayList<>();

        for (ItemDTO itemDTO : dto.getItemList()) {
            itemDTO.getTitulo().setId(tituloDTO.getId());
            ItemDTO savedItem = itemService.save(itemDTO);
            savedItems.add(savedItem);
        }

        CreateTituloDTO response = new CreateTituloDTO();
        response.setTitulo(tituloDTO);
        response.setItemList(savedItems);

        tituloDiretorService.cadastraTituloDiretro(tituloDTO, dto.getDiretor());
        tituloAtorService.cadastraTituloAtor(tituloDTO, dto.getAtores());

        return response;
    }

}
