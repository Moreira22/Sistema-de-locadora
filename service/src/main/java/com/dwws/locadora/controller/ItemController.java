package com.dwws.locadora.controller;

import com.dwws.locadora.service.DiretorService;
import com.dwws.locadora.service.ItemService;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.ItemListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/item")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ItemController {
    private final ItemService service;
    @GetMapping
    public ResponseEntity<List<ItemListDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idItem}")
    public ResponseEntity<ItemDTO> findByID(@PathVariable("idItem") Long idItem) {
        return new ResponseEntity<>(service.findByID(idItem), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ItemDTO> save(@RequestBody ItemDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }
}
