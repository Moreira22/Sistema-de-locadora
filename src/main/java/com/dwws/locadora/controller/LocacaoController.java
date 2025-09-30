package com.dwws.locadora.controller;
import com.dwws.locadora.service.DiretorService;
import com.dwws.locadora.service.ItemService;
import com.dwws.locadora.service.LocacaoService;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.LocacaoDTO;
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
@RequestMapping("api/locacao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class LocacaoController {
    private final LocacaoService service;
    @GetMapping
    public ResponseEntity<Page<LocacaoDTO>> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{idLocacao}")
    public ResponseEntity<LocacaoDTO> findByID(@PathVariable("idLocacao") Long idLocacao) {
        return new ResponseEntity<>(service.findByID(idLocacao), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LocacaoDTO> save(@RequestBody LocacaoDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }
}
