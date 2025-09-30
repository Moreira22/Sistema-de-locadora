package com.dwws.locadora.service.dto;

import java.time.LocalDate;

public interface FuncionarioProjection {
    Long getId();
    String getLogin();
    String getCpf();
    String getNome();
    Long getPerfilId();
    Boolean getAtivo();
    String getCargo();
    Double getSalario();
    LocalDate getDataAdmissao();
    LocalDate getDataDemissao();
}
