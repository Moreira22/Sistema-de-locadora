import {Classe} from "@/model/classe";
import {Categoria} from "@/model/categoria";
import {Item} from "@/model/item";
export interface Titulo {
    id: number;
    ano: number;
    sinopse: string;
    imagem: string;
    classe: Classe;
    categoria: Categoria;
}
export interface CreateItem{
    titulo: Titulo;
    itemList: Item[];
}
