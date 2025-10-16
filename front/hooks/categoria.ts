import Api from "@/server/server";
import {Categoria, CategoriaCreate} from "@/model/categoria";
import {useState} from "react";
export const useCategoria = () =>{
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>();
    const getCategorias = async (): Promise<Categoria[] | null> => {
        try{
            const respose = await Api.get('/categoria');
            setCategorias(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getCategoriaByName = async (nome: string): Promise<Categoria | null> => {
        try{
            const respose = await Api.get(`/categoria/${nome}`);
            setCategoria(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postCategoria = async (ator: CategoriaCreate): Promise<Categoria | null> => {
        try{
            const respose = await Api.post('/categoria', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getCategoriaById = async (id: number): Promise<Categoria | null> => {
        try{
            const respose = await Api.get(`/categoria/${id}`);
            setCategoria(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putCategoria = async (id: number, dados: CategoriaCreate): Promise<any | null> => {
        try {
            const categoria = { id, dados};
            const response = await Api.put('/categoria/update', categoria);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };
    const deleteCategoria = async (id: number): Promise<any | null> => {
        try {
            const response = await Api.delete(`/categoria/${id}`);
            return response.data;
        }catch (error){
            console.error('Delete', error);
            return error;
        }
    }

    return{getCategoriaById,getCategoriaByName,getCategorias,postCategoria,putCategoria,deleteCategoria, categorias, categoria};
}
