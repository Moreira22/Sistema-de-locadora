package com.dwws.locadora.controller;
import com.dwws.locadora.service.AtorService;
import com.dwws.locadora.service.UsuarioService;
import com.dwws.locadora.service.dto.AtorDTO;
import com.dwws.locadora.service.dto.UserPasswordChangeDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import com.dwws.locadora.service.dto.UsuarioListDTO;
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
@RequestMapping("api/ator")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class AtorController {
    private final AtorService service;

    @GetMapping
    public ResponseEntity<List<AtorDTO>> findAll( ) {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idAtor}")
    public ResponseEntity<AtorDTO> findByID(@PathVariable("idAtor") Long idAtor) {
        return new ResponseEntity<>(service.findByID(idAtor), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AtorDTO> save(@RequestBody AtorDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idAtor}")
    public ResponseEntity<Void> delete(@PathVariable Long idAtor) {
        service.deleteByID(idAtor);
        return ResponseEntity.noContent().build();
    }
}
