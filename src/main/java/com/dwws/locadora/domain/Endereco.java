package com.dwws.locadora.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "endereco")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Endereco implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_endereco")
    @SequenceGenerator(name = "seq_endereco", sequenceName = "seq_endereco", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "rua", nullable = false)
    private String rua;

    @Column(name = "numero", nullable = false)
    private String numero;

    @Column(name = "bairro", nullable = false)
    private String bairro;

    @Column(name = "cep", nullable = false)
    private String cep;

    @Column(name = "cidade", nullable = false)
    private String cidade;

    @Column(name = "UF", nullable = false)
    private String UF;


    public Endereco(Long id) {
        this.id = id;
    }
}

