import {Titulo} from "@/model/titulo";

export interface Item{
    id: number;
    numeroSerie: string;
    dataAquisicao: Date;
    titulo: Titulo;
    status: string;
}
export interface ItemCreate{
    id: number;
    numeroSerie: string;
    dataAquisicao: Date;
    status: string;
}
