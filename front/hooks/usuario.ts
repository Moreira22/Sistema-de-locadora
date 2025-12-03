"use client"
import {Usuario, Socio, Dependente} from "@/model/usuario";
import {Funcionario} from "@/model/funcionario";
import Api from "@/server/server";
import {Perfil} from "@/model/perfil";
import {useState} from "react";
export const useUsuario = () => {
    // List
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [socios, setSocios] = useState<Socio[]>([]);
    const [dependentes, setDependetes] = useState<Socio[]>([]);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    // By id / nome
    const [usuario, setUsuario] = useState<Usuario | Funcionario| null>();

    const getUsuarios = async (): Promise<Usuario[]> => {
        try {
            const response = await Api.get('/usuarios');
            setUsuarios(response.data);
            return response.data; // Isso deve ser um array
        } catch (error) {
            console.error(error);
            return []; // Retorna um array vazio em caso de erro
        }
    };

    const getDependente = async (): Promise<Dependente[]> => {
        try {
            const response = await Api.get('/usuarios/dependentes');
            setDependetes(response.data);
            return response.data; // Isso deve ser um array
        } catch (error) {
            console.error(error);
            return []; // Retorna um array vazio em caso de erro
        }
    };
    const getFuncionarios = async (): Promise<Funcionario[] | null> => {
        try{
            const respose = await Api.get('/usuarios/funcioarios');
            setFuncionarios(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getUsuarioById = async (userId: number): Promise<Usuario | Funcionario| null> => {
        try {
            const response = await Api.get(`/usuarios/${userId}`);
            setUsuario(response.data);
            return response.data;
        } catch (error) {
            console.error('GET BY ID', error);
            return null;
        }
    };
    const getUsuarioByNome = async (nome: string): Promise<Usuario | Funcionario| null> => {
        try {
            const response = await Api.get(`/usuarios/${nome}`);
            setUsuario(response.data);
            return response.data;
        } catch (error) {
            console.error('GET BY ID', error);
            return null;
        }
    };
    const postUsuario = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.post('/usuarios', user);
            setUsuario(response.data);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };
    const putUsuario = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.put('/usuarios/update', user);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };
    const postLogin = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.post('/usuarios/login', user);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    const getPerfil = async (): Promise<Perfil[]> => {
        try {
            const response = await Api.get('/usuarios/perfil');
            return response.data; // Isso deve ser um array
        } catch (error) {
            console.error(error);
            return []; // Retorna um array vazio em caso de erro
        }
    };

    return{ getUsuarioById, getFuncionarios, getUsuarioByNome, postUsuario, getUsuarios, putUsuario, postLogin, getPerfil,getDependente, dependentes, usuarios, funcionarios, usuario, socios};
};
