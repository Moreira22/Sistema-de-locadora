package com.dwws.locadora.controller;

import com.dwws.locadora.service.PerfilService;
import com.dwws.locadora.service.UsuarioService;
import com.dwws.locadora.service.dto.DependenteDTO;
import com.dwws.locadora.service.dto.DropdownDTO;
import com.dwws.locadora.service.dto.UserPasswordChangeDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("api/usuarios")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@Tag(name = "Usuario", description = "Controlador para salvar, lsiat e editar dados do usuarios")
public class UsuarioController {
    private final UsuarioService service;
    private final PerfilService  perfilService;

    //GET SIMPLE
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
    @GetMapping("/dependentes")
    public ResponseEntity<List<DependenteDTO>> findAllDependentes() {
        return new ResponseEntity<>(service.findAllDependentes(), HttpStatus.OK);
    }
    @GetMapping("/perfil")
    public ResponseEntity<List<DropdownDTO>> fillProfileDropdown() {
        return new ResponseEntity<>(perfilService.fillProfileDropdown(), HttpStatus.OK);
    }
    @GetMapping("/{idUsuario}")
    public ResponseEntity<UsuarioDTO> findByLogin(@PathVariable("idUsuario") Long idUsuario) {
        return new ResponseEntity<>(service.findByID(idUsuario), HttpStatus.OK);
    }

    // POST
    @PostMapping
    public ResponseEntity<UsuarioDTO> save(@RequestBody UsuarioDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }
    @PostMapping("/dependente")
    public ResponseEntity<DependenteDTO> save(@RequestBody DependenteDTO dto) {
        return new ResponseEntity<>(service.saveDependente(dto), HttpStatus.CREATED);
    }

    //DELETE
    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<Void> delete(@PathVariable("idUsuario") Long idUsuario) {
        service.delete(idUsuario);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //PUT
    @PutMapping("/updtSenha")
    public ResponseEntity<Void> updtSenha(@RequestBody UserPasswordChangeDTO userPasswordChangeDTO) {
        service.updtPassword(userPasswordChangeDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // PUTROS GET
    @GetMapping("/login/{login}")
    public ResponseEntity<UsuarioDTO> findByLogin(@PathVariable("login") String login) {
        return new ResponseEntity<>(service.findByLogin(login), HttpStatus.OK);
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<UsuarioDTO> findByNome(@PathVariable("nome") String nome) {
        return new ResponseEntity<>(service.findByNome(nome), HttpStatus.OK);
    }
    @GetMapping("/dependente/{socioId}")
    public ResponseEntity<List<DependenteDTO>> listAllDependentes(@PathVariable("socioId") Long socioId) {
        return new ResponseEntity<>(service.listAllDependentesBySocio(socioId), HttpStatus.OK);
    }


}
