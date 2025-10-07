package com.dwws.locadora.controller;
import com.dwws.locadora.service.DiretorService;
import com.dwws.locadora.service.ItemService;
import com.dwws.locadora.service.LocacaoService;
import com.dwws.locadora.service.NotificacaoService;
import com.dwws.locadora.service.TituloService;
import com.dwws.locadora.service.dto.CreateTituloDTO;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.LocacaoDTO;
import com.dwws.locadora.service.dto.NotificacaoDTO;
import com.dwws.locadora.service.dto.TituloDTO;
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
@RequestMapping("api/titulo")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class TituloController {
    private final TituloService service;
    @GetMapping
    public ResponseEntity<List<TituloDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idTitulo}")
    public ResponseEntity<TituloDTO> findByID(@PathVariable("idTitulo") Long idTitulo) {
        return new ResponseEntity<>(service.findByID(idTitulo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CreateTituloDTO> save(@RequestBody CreateTituloDTO dto) {
        return new ResponseEntity<>(service.saveTituloItem(dto), HttpStatus.CREATED);
    }
}
