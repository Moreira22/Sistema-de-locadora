import {Usuario} from "@/model/usuario";
import {Item} from "@/model/item";
export interface Avaliacao {
    id: number;
    estrelas: number;
    comentario: string
    data: Date;
    usuario: Usuario;
    item: Item;
}
