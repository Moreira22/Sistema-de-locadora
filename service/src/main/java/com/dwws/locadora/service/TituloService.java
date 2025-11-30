package com.dwws.locadora.service;

import com.dwws.locadora.domain.Titulo;
import com.dwws.locadora.domain.enums.StatusItem;
import com.dwws.locadora.repository.TituloRepository;
import com.dwws.locadora.service.dto.CategoriaDTO;
import com.dwws.locadora.service.dto.ClasseDTO;
import com.dwws.locadora.service.dto.CreateTituloDTO;
import com.dwws.locadora.service.dto.ItemDTO;
import com.dwws.locadora.service.dto.ListagemTitulosProjection;
import com.dwws.locadora.service.dto.TituloDTO;
import com.dwws.locadora.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TituloService {
    private final TituloMapper mapper;
    private final TituloRepository repository;
    private final ItemService itemService;
    private final TituloDiretorService tituloDiretorService;
    private final TituloAtorService tituloAtorService;
    private final CategoriaService categoriaService;
    private final ClasseService classeService;

    public Titulo findEntity(Long id){ return repository.findById(id).orElse(null); }

    public TituloDTO findByID(Long id){ return mapper.toDto(findEntity(id)); }

    public List<TituloDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto).toList();
    }

    public TituloDTO fingByID(Long id){ return mapper.toDto(findEntity(id)); }

    public TituloDTO save(TituloDTO dto){
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    @Transactional
    public CreateTituloDTO saveTituloItem(CreateTituloDTO dto) {
        // Salva o título
        dto.getTitulo().setClasse(classeService.findByID(dto.getClasseId()));
        dto.getTitulo().setCategoria(categoriaService.findByID(dto.getCategoriaId()));
        TituloDTO tituloDTO = save(dto.getTitulo());

        // Salva itens vinculados
        List<ItemDTO> savedItems = dto.getItemList().stream()
                .map(item -> {
                    item.setTitulo(tituloDTO);
                    item.setStatus(StatusItem.DISPONIVEL);
                    return itemService.save(item);
                })
                .toList();

        // Registra diretor e atores
        tituloDiretorService.cadastraTituloDiretro(tituloDTO, dto.getDiretorId());
        tituloAtorService.cadastraTituloAtor(tituloDTO, dto.getAtoreIds());

        // Retorna o DTO completo
        return new CreateTituloDTO(
                tituloDTO,
                savedItems,
                dto.getClasseId(),
                dto.getCategoriaId(),
                dto.getDiretorId(),
                dto.getAtoreIds()
        );
    }

    public List<ListagemTitulosProjection> listarTudo(){
        return repository.listagemTitulos();
    }


}
