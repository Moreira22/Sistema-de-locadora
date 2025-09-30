import {Usuario} from "@/model/usuario";

export interface Notificacao{
    id: number;
    mensagem: string;
    dataEnvio: Date;
    lida: boolean;
    usuario: Usuario;
}
