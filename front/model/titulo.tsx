import {Classe} from "@/model/classe";
import {Categoria} from "@/model/categoria";
import {ItemCreate} from "@/model/item";
export interface Titulo {
    id: number;
    ano: number;
    sinopse: string;
    nome: string;
    imagem: string;
    classeNome: string;
    categoriaNome: string;
    categoria: Categoria;
    classe: Classe;

}
export interface TituloCreate{
    id: number;
    ano: number;
    sinopse: string;
    imagem: string;
    classeId: number;
    categoriaId: number;
}
export interface CreateItem{
    titulo: TituloCreate;
    itemList: ItemCreate[];
}
export interface FilmeDTO {
    id: number;
    classeId: number;
    categoriaId: number;
    sinopse: string | null;
    imagem: string | null;
    tituloNome: string;
    tituloAno: number;
    categoriaNome: string;
    classeNome: string;
    classeValor: number;
    classePrazoDevolucao: number;
    diretores: string;
    atores: string;
    itensIds: string; // Ex: "SN-2025-003,SN-003"
    totalItens: number;
}

