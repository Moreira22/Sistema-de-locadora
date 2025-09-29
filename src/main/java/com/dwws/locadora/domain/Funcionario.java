package com.dwws.locadora.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "funcionario")
@PrimaryKeyJoinColumn(name = "usuario_id") // FK para Usuario
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Funcionario extends Usuario{

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "salario")
    private Double salario;

    @Column(name = "data_admissao")
    private LocalDate dataAdmissao;

    @Column(name = "data_demissao")
    private LocalDate dataDemissao;

    // Construtor completo incluindo campos da superclasse
    public Funcionario(Long id, String nome, String cpf, String email, String login, String senha,
                       String telefone, Boolean ativo, Perfil perfil, Endereco endereco,
                       String cargo, Double salario, LocalDate dataAdmissao, LocalDate dataDemissao) {
        super(id, nome, cpf, email, login, senha, telefone, ativo, perfil, endereco);
        this.cargo = cargo;
        this.salario = salario;
        this.dataAdmissao = dataAdmissao;
        this.dataDemissao = dataDemissao;
    }

}
