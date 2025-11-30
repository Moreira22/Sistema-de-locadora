package com.dwws.locadora.service;

import com.dwws.locadora.domain.Dependente;
import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.repository.DependenteRepository;
import com.dwws.locadora.repository.UsuarioRepository;
import com.dwws.locadora.service.dto.CreateUsuarioDTO;
import com.dwws.locadora.service.dto.DependenteDTO;
import com.dwws.locadora.service.dto.EnderecoDTO;
import com.dwws.locadora.service.dto.UserPasswordChangeDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import com.dwws.locadora.service.exception.EntityNotFoundException;
import com.dwws.locadora.service.mapper.DependenteMapper;
import com.dwws.locadora.service.mapper.UsuarioMapper;
import com.dwws.locadora.service.util.MensagemUsuarioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {
    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final EnderecoService enderecoService;
    private final DependenteRepository dependenteRepository;
    private final DependenteMapper dependenteMapper;
    private final PerfilService perfilService;

    public Usuario findEntity(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }
    public Dependente findEntityDependente(Long id) {
        return dependenteRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }
    public UsuarioDTO findByID(Long id) {
        return mapper.toDto(findEntity(id));
    }
    public DependenteDTO findByIDDependente(Long id) {return dependenteMapper.toDto(findEntityDependente(id));}

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

    public UsuarioDTO findByNome(String nome) {
        return repository.findByNome(nome)
                .map(mapper::toDto)
                .orElseThrow( () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }


    public List<DependenteDTO> listAllDependentesBySocio(Long socioId) {
        return  dependenteRepository.findAllBySocioId(socioId).stream()
                .map(dependenteMapper::toDto).toList();
    }
    public List<UsuarioDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto).toList();
    }
    public List<DependenteDTO> findAllDependentes() {
        return dependenteRepository.findAll().stream()
                .map(dependenteMapper::toDto).toList();
    }

    public UsuarioDTO save(UsuarioDTO dto) {
        dto.setDependentes(new ArrayList<>());

        if (dto.getId() == null) {
            dto.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        dto.setIdPerfil(2L);

        EnderecoDTO enderecoDTO = enderecoService.save(dto.getEndereco());
        dto.setEndereco(enderecoDTO);

        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }


    public DependenteDTO saveDependente(DependenteDTO dto) {

        // Aqui o DTO do dependente NÃO pode ter o mesmo id do usuário!
        UsuarioDTO socioDTO = findByID(dto.getIdSocio());

        validarDependenteParaSocio(socioDTO);

        if (dto.getId() == null) {
            dto.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        dto.setIdPerfil(3L);

        EnderecoDTO enderecoDTO = enderecoService.save(dto.getEndereco());
        dto.setEndereco(enderecoDTO);


        // Converte o dependente para entidade
        Dependente dependente = dependenteMapper.toEntity(dto);

        // Salva apenas o dependente (isso já vincula o socio)
        dependente = dependenteRepository.save(dependente);

        return dependenteMapper.toDto(dependente);
    }


    private void validarDependenteParaSocio(UsuarioDTO socio) {
        if (socio.getDependentes() != null && socio.getDependentes().size() >= 3) {
            throw new IllegalStateException(MensagemUsuarioUtil.MAXIMO_3_DEPENDENTE);
        }
    }


}
