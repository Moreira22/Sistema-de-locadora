package com.dwws.locadora.service;

import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.domain.enums.TipoUsuario;
import com.dwws.locadora.repository.LocacaoRepository;
import com.dwws.locadora.service.dto.DependenteDTO;
import com.dwws.locadora.service.dto.LocacaoListDTO;
import com.dwws.locadora.service.mapper.LocacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LocacaoService {
    private final LocacaoMapper mapper;
    private final LocacaoRepository repository;
    private final ItemService itemService;
    private final UsuarioService usuarioService;

    public Locacao findEntity(Long id){ return repository.findById(id).orElse(null); }

    public LocacaoListDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public Page<LocacaoListDTO> findAll(Pageable pageable) {
        return repository.listAll(pageable);
    }

    public LocacaoListDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    private LocacaoListDTO save(LocacaoListDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public LocacaoListDTO locacaoItem(LocacaoListDTO dto) {
        TipoUsuario tipo = TipoUsuario.fromCodigo(dto.getUsuario().getIdPerfil().intValue());

        if (tipo == TipoUsuario.DEPENDENTE) {
            validarDependente(dto.getUsuario().getId());
        }
        return save(dto);
    }

    private void validarDependente(Long idUsuario) {
        DependenteDTO dependente = usuarioService.findByIDDependente(idUsuario);

        if (!Boolean.TRUE.equals(dependente.getAutorizadoAlocar())) {
            throw new RuntimeException("Usuário dependente não está autorizado a alocar filmes.");
        }
    }

}
