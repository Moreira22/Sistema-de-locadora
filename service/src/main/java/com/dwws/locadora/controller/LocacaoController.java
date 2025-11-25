package com.dwws.locadora.controller;
import com.dwws.locadora.service.LocacaoService;
import com.dwws.locadora.service.dto.LocacaoListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/locacao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class LocacaoController {
    private final LocacaoService service;
    @GetMapping
    public ResponseEntity<Page<LocacaoListDTO>> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{idLocacao}")
    public ResponseEntity<LocacaoListDTO> findByID(@PathVariable("idLocacao") Long idLocacao) {
        return new ResponseEntity<>(service.findByID(idLocacao), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LocacaoListDTO> save(@RequestBody LocacaoListDTO dto) {
        return new ResponseEntity<>(service.locacaoItem(dto), HttpStatus.CREATED);
    }
}
