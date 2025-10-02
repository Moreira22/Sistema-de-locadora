import Api from "@/server/server";
import {Categoria} from "@/model/categoria";
export const useCategoria = () =>{
    const getCategorias = async (): Promise<Categoria[] | null> => {
        try{
            const respose = await Api.get('/categoria');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getCategoriaByName = async (nome: string): Promise<Categoria | null> => {
        try{
            const respose = await Api.get(`/categoria/${nome}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postCategoria = async (ator: Categoria): Promise<Categoria | null> => {
        try{
            const respose = await Api.post('/categoria/register', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getCategoriaById = async (id: number): Promise<Categoria | null> => {
        try{
            const respose = await Api.get(`/categoria/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putCategoria = async (ator: Categoria): Promise<any | null> => {
        try {
            const response = await Api.put('/categoria/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{getCategoriaById,getCategoriaByName,getCategorias,postCategoria,putCategoria};
}
