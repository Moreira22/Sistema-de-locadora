import {Classe} from "@/model/classe";
import {Categoria} from "@/model/categoria";
export interface Titulo {
    id: number;
    ano: number;
    sinopse: string;
    imagem: string;
    classe: Classe;
    categoria: Categoria;
}
