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
    perfilDesc: string;
    ativo: boolean;
    endereco: Endereco;
}
