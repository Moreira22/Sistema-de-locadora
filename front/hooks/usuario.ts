import {Usuario} from "@/model/usuario";
import {Funcionario} from "@/model/funcionario";
import Api from "@/server/server";
import {Perfil} from "@/model/perfil";
export const useUsuario = () => {

    const getUsuarios = async (): Promise<Usuario[]> => {
        try {
            const response = await Api.get('/usuarios');
            return response.data; // Isso deve ser um array
        } catch (error) {
            console.error(error);
            return []; // Retorna um array vazio em caso de erro
        }
    };
    const getFuncionarios = async (): Promise<Funcionario[] | null> => {
        try{
            const respose = await Api.get('/usuarios/funcioarios');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getUsuarioById = async (userId: number): Promise<Usuario | Funcionario| null> => {
        try {
            const response = await Api.get(`/usuarios/${userId}`);
            return response.data;
        } catch (error) {
            console.error('GET BY ID', error);
            return null;
        }
    };
    const getUsuarioByNome = async (nome: string): Promise<Usuario | Funcionario| null> => {
        try {
            const response = await Api.get(`/usuarios/${nome}`);
            return response.data;
        } catch (error) {
            console.error('GET BY ID', error);
            return null;
        }
    };
    const postUsuario = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.post('/usuarios', user);
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

    return{ getUsuarioById, getFuncionarios, getUsuarioByNome, postUsuario, getUsuarios, putUsuario, postLogin, getPerfil };
};
