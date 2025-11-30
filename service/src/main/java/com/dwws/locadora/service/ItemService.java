package com.dwws.locadora.service;

import com.dwws.locadora.domain.Item;
import com.dwws.locadora.repository.ItemRepository;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {
    private final ItemMapper mapper;
    private final ItemRepository repository;

    public Item findEntity(Long id){ return repository.findById(id).orElse(null); }

    public ItemDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public List<ItemDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto).toList();
    }
    public List<ItemDTO> findAllDisponime() {
        return repository.listItemsDisponiveis().stream()
                .map(mapper::toDto).toList();
    }

    public ItemDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public ItemDTO save(ItemDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
