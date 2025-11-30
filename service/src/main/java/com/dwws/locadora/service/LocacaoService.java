package com.dwws.locadora.service;

import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.domain.enums.StatusItem;
import com.dwws.locadora.domain.enums.TipoUsuario;
import com.dwws.locadora.repository.LocacaoRepository;
import com.dwws.locadora.service.dto.DependenteDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.LocacaoDTO;
import com.dwws.locadora.service.mapper.LocacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LocacaoService {
    private final LocacaoMapper mapper;
    private final LocacaoRepository repository;
    private final ItemService itemService;
    private final UsuarioService usuarioService;

    public Locacao findEntity(Long id){ return repository.findById(id).orElse(null); }

    public LocacaoDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public List<LocacaoDTO> findAll(){
        return repository.findAllByAtivoTrue().stream()
                .map(mapper::toDto).toList();
    }

    public LocacaoDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    private LocacaoDTO save(LocacaoDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public LocacaoDTO locacaoItem(LocacaoDTO dto) {
        TipoUsuario tipo = TipoUsuario.fromCodigo(dto.getUsuario().getIdPerfil().intValue());

        if (tipo == TipoUsuario.DEPENDENTE) {
            validarDependente(dto.getUsuario().getId());
        }

        dto.setAtivo(true);
        atualizarStatusItens(dto.getItem(), StatusItem.LOCADO);

        return save(dto);
    }

    private void validarDependente(Long idUsuario) {
        DependenteDTO dependente = usuarioService.findByIDDependente(idUsuario);

        if (!Boolean.TRUE.equals(dependente.getAutorizadoAlocar())) {
            throw new RuntimeException("Usuário dependente não está autorizado a alocar filmes.");
        }
    }

    private void atualizarStatusItens(ItemDTO item, StatusItem novoStatus) {
        if (item == null) return;

        item.setStatus(novoStatus);
        itemService.save(item);

    }

    public LocacaoDTO devolucaoItem(Long idLocacao) {
        LocacaoDTO locacao = fingByID(idLocacao);

        if (locacao == null) {
            throw new RuntimeException("Locação não encontrada.");
        }


        if (!Boolean.TRUE.equals(locacao.getAtivo())) {
            throw new RuntimeException("Esta locação já foi finalizada.");
        }

        locacao.setAtivo(false);

        atualizarStatusItens(locacao.getItem(), StatusItem.DISPONIVEL);


         locacao.setDataDevolucao(LocalDate.now());

        return save(locacao);
    }


}
