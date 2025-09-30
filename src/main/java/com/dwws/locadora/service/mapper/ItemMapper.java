package com.dwws.locadora.service.mapper;

import com.dwws.locadora.domain.Item;
import com.dwws.locadora.service.dto.ItemDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {
    @Override
    @Mapping(source = "titulo.id", target = "tituloId")
    ItemDTO toDto(Item item);

    @Override
    @InheritInverseConfiguration
    Item toEntity(ItemDTO itemDTO);
}
