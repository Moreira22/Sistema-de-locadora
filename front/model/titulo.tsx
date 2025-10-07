import {Classe} from "@/model/classe";
import {Categoria} from "@/model/categoria";
import {ItemCreate} from "@/model/item";
export interface Titulo {
    id: number;
    ano: number;
    sinopse: string;
    imagem: string;
    classe: Classe;
    categoria: Categoria;
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
