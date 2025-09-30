import {Titulo} from "@/model/titulo";

export interface Item{
    id: number;
    numeroSerie: string;
    dataAquisicao: Date;
    titulo: Titulo;
    status: string;
}
