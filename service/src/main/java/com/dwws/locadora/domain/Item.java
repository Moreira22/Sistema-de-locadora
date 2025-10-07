package com.dwws.locadora.domain;

import com.dwws.locadora.domain.enums.StatusItem;
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
@Table(name = "item")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_item")
    @SequenceGenerator(name = "seq_item", sequenceName = "seq_item", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "numero_serie", nullable = false)
    private String numeroSerie;

    @Column(name = "data_aquisixao", nullable = false)
    private LocalDate dataAquisicao;

    @ManyToOne
    @JoinColumn(name = "titulo_id", nullable = false)
    private Titulo titulo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusItem status;

}
