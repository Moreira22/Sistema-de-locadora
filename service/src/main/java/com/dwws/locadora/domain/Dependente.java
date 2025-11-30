package com.dwws.locadora.domain;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "dependente")
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Dependente implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_dependente")
    @SequenceGenerator(name = "seq_dependente", sequenceName = "seq_dependente", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "cpf", nullable = false)
    private String cpf;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "login", nullable = false)
    private String login;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo;

    @ManyToOne()
    @JoinColumn(name = "perfil_id")
    private Perfil perfil;

    @OneToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "socio_id", nullable = false)
    private Usuario socio;

    @Column(name = "autorizado_alocar", nullable = false)
    private Boolean autorizadoAlocar;

}
