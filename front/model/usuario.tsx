import {Endereco} from "@/model/endereco";

export interface Usuario{
    id: number;
    login: string;
    senha: string;
    cpf: string;
    email:string;
    telefone: string;
    nome: string;
    perfilId: number;
    descPerfil: string;
    ativo: boolean;
    endereco: Endereco;
}

export interface Socio{
    id: number;
    login: string;
    senha: string;
    cpf: string;
    email:string;
    telefone: string;
    nome: string;
    perfilId: number;
    descPerfil: string;
    ativo: boolean;
    endereco: Endereco;
    dependentes: Usuario[];
}

export interface Dependente{
    id: number;
    login: string;
    senha: string;
    cpf: string;
    email:string;
    telefone: string;
    nome: string;
    perfilId: number;
    descPerfil: string;
    ativo: boolean;
    endereco: Endereco;
    dependentes: Usuario[];
    autorizadoAlocar: boolean;
}
