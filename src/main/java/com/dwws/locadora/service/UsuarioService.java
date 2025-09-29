package com.dwws.locadora.service;

import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.repository.FuncionarioRepository;
import com.dwws.locadora.repository.UsuarioRepository;
import com.dwws.locadora.service.dto.FuncionarioDTO;
import com.dwws.locadora.service.dto.FuncionarioProjection;
import com.dwws.locadora.service.dto.UserPasswordChangeDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import com.dwws.locadora.service.dto.UsuarioListDTO;
import com.dwws.locadora.service.exception.EntityNotFoundException;
import com.dwws.locadora.service.mapper.FuncionarioMapper;
import com.dwws.locadora.service.mapper.UsuarioMapper;
import com.dwws.locadora.service.util.MensagemUsuarioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {
    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final FuncionarioMapper  funcionarioMapper;
    private final FuncionarioRepository  funcionarioRepository;

    public Usuario findEntity(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }
    public Funcionario findFuncionario(Long id) {
        return funcionarioRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }

    public Page<UsuarioListDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public UsuarioDTO findByID(Long id) {
        return mapper.toDto(findEntity(id));
    }

    public UsuarioDTO save(UsuarioDTO dto) {

        if (dto.getId() == null) {
            dto.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public void delete(Long id) {
        Usuario user = findEntity(id);
        user.setAtivo(false);
        repository.save(user);
    }

    public void updtPassword(UserPasswordChangeDTO userPasswordChangeDTO) {
        Usuario user = findEntity(userPasswordChangeDTO.getId());
        user.setSenha(passwordEncoder.encode(userPasswordChangeDTO.getSenha()));
        repository.save(user);
    }

    public UsuarioDTO findByLogin(String login) {
        return repository.findByLogin(login)
                .map(mapper::toDto)
                .orElseThrow( () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }

    public FuncionarioDTO saveFuncionario(FuncionarioDTO dto){
        return funcionarioMapper.toDto(funcionarioRepository.save(funcionarioMapper.toEntity(dto)));
    }

    public FuncionarioDTO findFuncionarioByID(Long id) {
        return funcionarioMapper.toDto(findFuncionario(id));
    }

    public Page<FuncionarioProjection> findAllFuncionario(Pageable pageable) {
        return funcionarioRepository.listAll(pageable);
    }


}
