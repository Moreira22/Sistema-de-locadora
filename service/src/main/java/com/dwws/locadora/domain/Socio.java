package com.dwws.locadora.domain;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "socio")
@PrimaryKeyJoinColumn(name = "usuario_id")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Socio extends Usuario{
    @OneToMany(mappedBy = "socio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Dependente> dependentes;

    public Socio(Usuario usuario) {
        super(usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(),
                usuario.getLogin(), usuario.getSenha(), usuario.getTelefone(),
                usuario.getAtivo(), usuario.getPerfil(), usuario.getEndereco());
    }
}
