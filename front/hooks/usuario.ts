import {Usuario} from "@/model/usuario";
import {Funcionario} from "@/model/funcionario";
import Api from "@/server/server";
export const useUsuario = () => {

    const getUsuarios = async (): Promise<Usuario[] | null> => {
        try{
            const respose = await Api.get('/usuarios');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getFuncionarios = async (): Promise<Funcionario[] | null> => {
        try{
            const respose = await Api.get('/usuario/funcioarios');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getUsuarioById = async (userId: number): Promise<Usuario | Funcionario| null> => {
        try {
            const response = await Api.get(`/usuario/${userId}`);
            return response.data;
        } catch (error) {
            console.error('GET BY ID', error);
            return null;
        }
    };
    const postUsuario = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.post('/usuario/register', user);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };
    const putUsuario = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.put('/usuario/update', user);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };
    const postLogin = async (user: any): Promise<any | null> => {
        try {
            const response = await Api.post('/usuario/login', user);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{ getUsuarioById, getFuncionarios, postUsuario, getUsuarios, putUsuario, postLogin };
};
