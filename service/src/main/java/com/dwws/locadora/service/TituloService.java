package com.dwws.locadora.service;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.repository.TituloRepository;
import com.dwws.locadora.service.dto.CreateTituloDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.TituloDTO;
import com.dwws.locadora.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Titulo findEntity(Long id){ return repository.findById(id).orElse(null); }

    public TituloDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public List<TituloDTO> findAll() {
        return repository.listAll();
    }

    public TituloDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public TituloDTO save(TituloDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    @Transactional
    public CreateTituloDTO saveTituloItem(CreateTituloDTO dto) {
        TituloDTO tituloDTO = save(dto.getTitulo());

        List<ItemDTO> savedItems = new ArrayList<>();

        for (ItemDTO itemDTO : dto.getItemList()) {
            itemDTO.setTituloId(tituloDTO.getId());
            ItemDTO savedItem = itemService.save(itemDTO);
            savedItems.add(savedItem);
        }

        CreateTituloDTO response = new CreateTituloDTO();
        response.setTitulo(tituloDTO);
        response.setItemList(savedItems);

        return response;
    }

}
