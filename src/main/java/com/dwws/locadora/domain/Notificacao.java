package com.dwws.locadora.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "notificacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notificacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_notificacao")
    @SequenceGenerator(name = "seq_notificacao", sequenceName = "seq_notificacao", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "mensagem", nullable = false)
    private String mensagem;

    @Column(name = "data_envio", nullable = false)
    private LocalDate dataEnvio;

    @Column(name = "lida", nullable = false)
    private Boolean lida = false;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}
