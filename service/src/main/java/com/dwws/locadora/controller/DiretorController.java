package com.dwws.locadora.controller;

import com.dwws.locadora.service.DiretorService;
import com.dwws.locadora.service.dto.DiretorDTO;
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
@RequestMapping("api/diretor")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class DiretorController {
    private final DiretorService service;
    @GetMapping
    public ResponseEntity<List<DiretorDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idDiretor}")
    public ResponseEntity<DiretorDTO> findByID(@PathVariable("idDiretor") Long idDiretor) {
        return new ResponseEntity<>(service.findByID(idDiretor), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DiretorDTO> save(@RequestBody DiretorDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idDiretor}")
    public ResponseEntity<Void> delete(@PathVariable Long idDiretor) {
        service.deleteByID(idDiretor);
        return ResponseEntity.noContent().build();
    }
}
