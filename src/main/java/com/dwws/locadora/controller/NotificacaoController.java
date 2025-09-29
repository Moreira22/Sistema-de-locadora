package com.dwws.locadora.controller;
import com.dwws.locadora.service.DiretorService;
import com.dwws.locadora.service.ItemService;
import com.dwws.locadora.service.LocacaoService;
import com.dwws.locadora.service.NotificacaoService;
import com.dwws.locadora.service.dto.DiretorDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.LocacaoDTO;
import com.dwws.locadora.service.dto.NotificacaoDTO;
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
@RequestMapping("api/notificacao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class NotificacaoController {
    private final NotificacaoService service;
    @GetMapping
    public ResponseEntity<Page<NotificacaoDTO>> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{idNotificacao}")
    public ResponseEntity<NotificacaoDTO> findByID(@PathVariable("idNotificacao") Long idNotificacao) {
        return new ResponseEntity<>(service.findByID(idNotificacao), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<NotificacaoDTO> save(@RequestBody NotificacaoDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }
}
