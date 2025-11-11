package com.dwws.locadora.controller;

import com.dwws.locadora.service.PerfilService;
import com.dwws.locadora.service.UsuarioService;
import com.dwws.locadora.service.dto.CreateDependenteDTO;
import com.dwws.locadora.service.dto.CreateUsuarioDTO;
import com.dwws.locadora.service.dto.DependenteDTO;
import com.dwws.locadora.service.dto.DropdownDTO;
import com.dwws.locadora.service.dto.FuncionarioDTO;
import com.dwws.locadora.service.dto.FuncionarioProjection;
import com.dwws.locadora.service.dto.SocioDTO;
import com.dwws.locadora.service.dto.UserPasswordChangeDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import com.dwws.locadora.service.dto.UsuarioListDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@RequestMapping("api/usuarios")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@Tag(name = "Usuario", description = "Controlador para salvar, lsiat e editar dados do usuarios")
public class UsuarioController {
    private final UsuarioService service;
    private final PerfilService  perfilService;

    @GetMapping
    public ResponseEntity<Page<UsuarioListDTO>> findAll(Pageable pageable) {
        return new ResponseEntity<>(service.findAll(pageable), HttpStatus.OK);
    }
    @GetMapping("/perfil")
    public ResponseEntity<List<DropdownDTO>> fillProfileDropdown() {
        return new ResponseEntity<>(perfilService.fillProfileDropdown(), HttpStatus.OK);
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<UsuarioDTO> findByID(@PathVariable("idUsuario") Long idUsuario) {
        return new ResponseEntity<>(service.findByID(idUsuario), HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<UsuarioDTO> save(@RequestBody CreateUsuarioDTO dto) {
//        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
//    }

    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<Void> delete(@PathVariable("idUsuario") Long idUsuario) {
        service.delete(idUsuario);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/updtSenha")
    public ResponseEntity<Void> updtSenha(@RequestBody UserPasswordChangeDTO userPasswordChangeDTO) {
        service.updtPassword(userPasswordChangeDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<UsuarioDTO> findByLogin(@PathVariable("login") String login) {
        return new ResponseEntity<>(service.findByLogin(login), HttpStatus.OK);
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<UsuarioDTO> findByNome(@PathVariable("nome") String nome) {
        return new ResponseEntity<>(service.findByNome(nome), HttpStatus.OK);
    }
    @GetMapping("/clientes")
    public ResponseEntity<List<SocioDTO>> listAllCliente() {
        return new ResponseEntity<>(service.listAllSocio(), HttpStatus.OK);
    }

    @GetMapping("/dependente")
    public ResponseEntity<List<DependenteDTO>> listAllDependentes() {
        return new ResponseEntity<>(service.listAllDependentes(), HttpStatus.OK);
    }

    @PostMapping("/socio")
    public ResponseEntity<SocioDTO> saveSocio(@RequestBody CreateUsuarioDTO dto) {
        return new ResponseEntity<>(service.saveSocio(dto), HttpStatus.CREATED);
    }

    @PostMapping("/dependente")
    public ResponseEntity<DependenteDTO> saveDependentes(@RequestBody CreateDependenteDTO dto) {
        return new ResponseEntity<>(service.saveDependentes(dto), HttpStatus.CREATED);
    }

    @GetMapping("/funcionario")
    public ResponseEntity<Page<FuncionarioProjection>> findAllFincionario(Pageable pageable) {
        return new ResponseEntity<>(service.findAllFuncionario(pageable), HttpStatus.OK);
    }

    @PostMapping("/funcionario")
    public ResponseEntity<FuncionarioDTO> saveFuncionario(@RequestBody FuncionarioDTO dto) {
        return new ResponseEntity<>(service.saveFuncionario(dto), HttpStatus.CREATED);
    }

    @GetMapping("/funcionario/{idUsuario}")
    public ResponseEntity<FuncionarioDTO> findByIDFuncionario(@PathVariable("idUsuario") Long idUsuario) {
        return new ResponseEntity<>(service.findFuncionarioByID(idUsuario), HttpStatus.OK);
    }

}
