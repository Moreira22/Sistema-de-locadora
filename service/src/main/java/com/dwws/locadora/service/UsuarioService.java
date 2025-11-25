package com.dwws.locadora.service;

import com.dwws.locadora.domain.Dependente;
import com.dwws.locadora.domain.Funcionario;
import com.dwws.locadora.domain.Socio;
import com.dwws.locadora.domain.Usuario;
import com.dwws.locadora.repository.DependenteRepository;
import com.dwws.locadora.repository.FuncionarioRepository;
import com.dwws.locadora.repository.SocioRepository;
import com.dwws.locadora.repository.UsuarioRepository;
import com.dwws.locadora.service.dto.CreateDependenteDTO;
import com.dwws.locadora.service.dto.CreateUsuarioDTO;
import com.dwws.locadora.service.dto.DependenteDTO;
import com.dwws.locadora.service.dto.EnderecoDTO;
import com.dwws.locadora.service.dto.FuncionarioDTO;
import com.dwws.locadora.service.dto.FuncionarioProjection;
import com.dwws.locadora.service.dto.SocioDTO;
import com.dwws.locadora.service.dto.UserPasswordChangeDTO;
import com.dwws.locadora.service.dto.UsuarioDTO;
import com.dwws.locadora.service.dto.UsuarioListDTO;
import com.dwws.locadora.service.exception.EntityNotFoundException;
import com.dwws.locadora.service.mapper.DependenteMapper;
import com.dwws.locadora.service.mapper.FuncionarioMapper;
import com.dwws.locadora.service.mapper.SocioMapper;
import com.dwws.locadora.service.mapper.UsuarioMapper;
import com.dwws.locadora.service.util.MensagemUsuarioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final FuncionarioMapper  funcionarioMapper;
    private final FuncionarioRepository  funcionarioRepository;
    private final EnderecoService enderecoService;
    private final SocioRepository socioRepository;
    private final SocioMapper socioMapper;
    private final DependenteRepository dependenteRepository;
    private final DependenteMapper dependenteMapper;

    public Usuario findEntity(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }
    public Funcionario findFuncionario(Long id) {
        return funcionarioRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }
    public Socio findEntitySocio(Long id) {
        return socioRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }
    public Dependente findEntityDependente(Long id) {
        return dependenteRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }

    public Page<UsuarioListDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public UsuarioDTO findByID(Long id) {
        return mapper.toDto(findEntity(id));
    }
    public SocioDTO findByIDSocio(Long id) {return socioMapper.toDto(findEntitySocio(id));}
    public DependenteDTO findByIDDependente(Long id) {return dependenteMapper.toDto(findEntityDependente(id));}

    public Usuario save(CreateUsuarioDTO dto) {

        if (dto.getUsuario().getId() == null) {
            dto.getUsuario().setSenha(passwordEncoder.encode(dto.getUsuario().getSenha()));
        }
        EnderecoDTO enderecoDTO = enderecoService.save(dto.getEndereco());
        dto.getUsuario().setIdEndereco(enderecoDTO.getId());
        return repository.save(mapper.toEntity(dto.getUsuario()));
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

    public UsuarioDTO findByNome(String nome) {
        return repository.findByNome(nome)
                .map(mapper::toDto)
                .orElseThrow( () -> new EntityNotFoundException(MensagemUsuarioUtil.ENTITY_NOT_FOUND));
    }

    public List<UsuarioDTO> listAllUsuario(){
        return repository.findAll().stream()
                .map(mapper::toDto).toList();
    }

    public List<SocioDTO> listAllSocio() {
        return  socioRepository.findAll().stream()
                .map(socioMapper::toDto).toList();
    }

    public List<DependenteDTO> listAllDependentes(Long socioId) {
        return  dependenteRepository.findAllBySocioId(socioId).stream()
                .map(dependenteMapper::toDto).toList();
    }

    @Transactional
    public SocioDTO saveSocio(CreateUsuarioDTO dto) {
        Usuario usuarioSalvo = save(dto);

        Socio socio = new Socio(usuarioSalvo);

        socio.setDependentes(new ArrayList<>());
        socio.setId(null);

        Socio socioSalvo = socioRepository.save(socio);

        return socioMapper.toDto(socioSalvo);
    }

    @Transactional
    public DependenteDTO saveDependentes(CreateDependenteDTO dto) {

        CreateUsuarioDTO createUser = new CreateUsuarioDTO();
        createUser.setUsuario(dto.getUsuario());
        createUser.setEndereco(dto.getEndereco());

        Usuario usuarioSalvo = save(createUser);

        Dependente dependente = new Dependente(usuarioSalvo);
        dependente.setId(null);

        dependente.setAutorizadoAlocar(dto.getAutorizadoAlocar() != null ? dto.getAutorizadoAlocar() : true);


        Socio socio = findEntitySocio(dto.getIdSocio());
        validarDependenteParaSocio(socio);
        dependente.setSocio(socio);

        if (socio.getDependentes() == null) {
            socio.setDependentes(new ArrayList<>());
        }
        socio.getDependentes().add(dependente);

        Dependente dependenteSalvo = dependenteRepository.save(dependente);
        socioRepository.save(socio);

        return dependenteMapper.toDto(dependenteSalvo);
    }

    private void validarDependenteParaSocio(Socio socio) {
        if (socio.getDependentes() != null && socio.getDependentes().size() >= 3) {
            throw new IllegalStateException(MensagemUsuarioUtil.MAXIMO_3_DEPENDENTE);
        }
    }


}
