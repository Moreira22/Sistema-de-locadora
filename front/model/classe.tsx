export interface Classe {
     id: number;
     nome: string;
     valor: number;
     prazoDevolucao: string;
}
export interface ClasseLista {
    id: number;
    nome: string;
}
export interface ClasseCreate {
    nome: string;
    valor?: number;
    prazoDevolucao?: number;
}
