package com.dwws.locadora.repository;

import com.dwws.locadora.domain.Locacao;
import com.dwws.locadora.service.dto.LocacaoListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long>{
    @Query("""
    SELECT NEW com.dwws.locadora.service.dto.LocacaoListDTO(
        l.id,
        l.dataLocaoa,
        l.dataPervista,
        l.dataDevolucao,
        l.multa,
        l.valor,
        l.status,
        NEW com.dwws.locadora.service.dto.UsuarioDTO(
            l.usuario.id,
            l.usuario.login,
            l.usuario.nome,
            l.usuario.cpf,
            l.usuario.email,
            l.usuario.senha,
            l.usuario.ativo,
            l.usuario.telefone,
            l.usuario.perfil.id,
            l.usuario.endereco.id
        ),
        NEW com.dwws.locadora.service.dto.ItemListDTO(
            i.id,
            i.numeroSerie,
            i.dataAquisicao,
            NEW com.dwws.locadora.service.dto.TituloListDTO(
                t.id,
                t.ano,
                t.sinopse,
                t.nome,
                t.imagem,
                c.id,
                cat.id,
                c.nome,
                cat.nome
            ),
            i.status
        )
    )
    FROM Locacao l
    JOIN l.item i
    JOIN i.titulo t
    JOIN t.classe c
    JOIN t.categoria cat
""")
    Page<LocacaoListDTO> listAll(Pageable pageable);





}
