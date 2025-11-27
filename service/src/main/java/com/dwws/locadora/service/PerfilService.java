package com.dwws.locadora.service;

import com.dwws.locadora.domain.Perfil;
import com.dwws.locadora.repository.PerfilRepository;
import com.dwws.locadora.service.dto.DropdownDTO;
import com.dwws.locadora.service.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PerfilService {
    private final PerfilRepository repository;

    public List<DropdownDTO> fillProfileDropdown() {
        return repository.profileDropdown();
    }

    public Perfil findEntity(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Perfil não encontrado"));
    }
}
