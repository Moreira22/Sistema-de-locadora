package com.dwws.locadora.controller;
import com.dwws.locadora.service.AvaliacaoService;
import com.dwws.locadora.service.CategoriaService;
import com.dwws.locadora.service.ClasseService;
import com.dwws.locadora.service.dto.AvaliacaoDTO;
import com.dwws.locadora.service.dto.CategoriaDTO;
import com.dwws.locadora.service.dto.ClasseDTO;
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
@RequestMapping("api/classe")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ClasseController {
    private final ClasseService service;
    @GetMapping
    public ResponseEntity<Page<ClasseDTO>> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{idClasse}")
    public ResponseEntity<ClasseDTO> findByID(@PathVariable("idClasse") Long idClasse) {
        return new ResponseEntity<>(service.findByID(idClasse), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ClasseDTO> save(@RequestBody ClasseDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }
}
