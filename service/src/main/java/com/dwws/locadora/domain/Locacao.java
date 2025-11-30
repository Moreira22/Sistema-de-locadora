package com.dwws.locadora.domain;

import com.dwws.locadora.domain.enums.StatusLocacao;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import java.time.LocalDate;

@Entity
@Table(name = "locacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Locacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_locacao")
    @SequenceGenerator(name = "seq_locacao", sequenceName = "seq_locacao", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "data_locacao", nullable = false)
    private LocalDate dataLocaoa;

    @Column(name = "data_pervista", nullable = false)
    private LocalDate dataPervista;

    @Column(name = "data_devolucao")
    private LocalDate dataDevolucao;

    @Column(name = "multa")
    private Float multa;

    @Column(name = "valor", nullable = false)
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusLocacao status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "dependente_id")
    private Dependente dependente;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo;

}
