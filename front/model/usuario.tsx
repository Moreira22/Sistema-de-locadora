import {Endereco} from "@/model/endereco";

export interface Usuario{
    id: number;
    login: string;
    cpf: string;
    nome: string;
    idPerfil: number;
    descPerfil: string;
    ativo: boolean;
    endereco: Endereco;
}
