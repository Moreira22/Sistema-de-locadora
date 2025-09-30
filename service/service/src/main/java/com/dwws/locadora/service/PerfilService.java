package com.dwws.locadora.service;

import com.dwws.locadora.repository.PerfilRepository;
import com.dwws.locadora.service.dto.DropdownDTO;
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
}
