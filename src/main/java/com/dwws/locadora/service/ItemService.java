package com.dwws.locadora.service;

import com.dwws.locadora.domain.Item;
import com.dwws.locadora.repository.ItemRepository;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {
    private final ItemMapper mapper;
    private final ItemRepository repository;

    public Item findEntity(Long id){ return repository.findById(id).orElse(null); }

    public ItemDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<ItemDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public ItemDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public ItemDTO save(ItemDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }
}
