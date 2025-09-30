package com.dwws.locadora.controller;

import com.dwws.locadora.service.AvaliacaoService;
import com.dwws.locadora.service.dto.AvaliacaoDTO;
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

@RestController
@RequestMapping("api/avaliacao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class AvaliacaoController {
    private final AvaliacaoService  service;

    @GetMapping
    public ResponseEntity<Page<AvaliacaoDTO>> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{idAvaliacao}")
    public ResponseEntity<AvaliacaoDTO> findByID(@PathVariable("idAvaliacao") Long idAvaliacao) {
        return new ResponseEntity<>(service.findByID(idAvaliacao), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AvaliacaoDTO> save(@RequestBody AvaliacaoDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }
}
