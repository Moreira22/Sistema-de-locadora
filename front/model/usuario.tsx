import {Endereco} from "@/model/endereco";

export interface Usuario{
    id: number;
    login: string;
    senha: string;
    cpf: string;
    email:string;
    telefone: string;
    nome: string;
    idPerfil: number;
    descPerfil: string;
    ativo: boolean;
    endereco: Endereco;
}
