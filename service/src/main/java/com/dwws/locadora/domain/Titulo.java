package com.dwws.locadora.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "titulo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Titulo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_titulo")
    @SequenceGenerator(name = "seq_titulo", sequenceName = "seq_titulo", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ano", nullable = false)
    private Integer ano;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "sinopse", nullable = false, columnDefinition = "TEXT")
    private String sinopse;

    @Lob
    @Column(name = "imagem")
    private byte[] imagem;

    @ManyToOne
    @JoinColumn(name = "classe_id", nullable = false)
    private Classe classe;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
}


