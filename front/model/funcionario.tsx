import {Usuario} from "@/model/usuario";

export interface Funcionario  extends Usuario {
    cargo: string;
    salario: string;
    dataAdmissao: Date;
    dataDemissao: Date;
}
