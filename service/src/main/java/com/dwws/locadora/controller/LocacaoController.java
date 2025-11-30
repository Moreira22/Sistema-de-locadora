package com.dwws.locadora.controller;
import com.dwws.locadora.service.LocacaoService;
import com.dwws.locadora.service.dto.LocacaoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/locacao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class LocacaoController {
    private final LocacaoService service;
    @GetMapping
    public ResponseEntity<List<LocacaoDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idLocacao}")
    public ResponseEntity<LocacaoDTO> findByID(@PathVariable("idLocacao") Long idLocacao) {
        return new ResponseEntity<>(service.findByID(idLocacao), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LocacaoDTO> save(@RequestBody LocacaoDTO dto) {
        return new ResponseEntity<>(service.locacaoItem(dto), HttpStatus.CREATED);
    }

    @PostMapping("/{idLocacao}")
    public ResponseEntity<LocacaoDTO> save(@PathVariable("idLocacao") Long idLocacao) {
        return new ResponseEntity<>(service.devolucaoItem(idLocacao), HttpStatus.CREATED);
    }
}
