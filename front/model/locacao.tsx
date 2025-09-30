import {Usuario} from "@/model/usuario";
import {Item} from "@/model/item";
export interface Locacao {
    id: number;
    dataLocaoa: Date;
    dataPervista: Date;
    dataDevolucao: Date;
    multa: number;
    valor: number;
    status: string;
    usuario: Usuario;
    item: Item;
}
