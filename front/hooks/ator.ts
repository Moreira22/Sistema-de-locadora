import Api from "@/server/server";
import {Ator, AtorCreate} from "@/model/ator";
import {useState} from "react";
export const useAtor = () =>{
    const [atores, setAtores] = useState<Ator[]>([]);
    const [ator, setAtor] = useState<Ator[]>([]);
    const getAtores = async (): Promise<Ator[] | null> => {
        try{
            const respose = await Api.get('/ator');
            setAtores(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getAtorByName = async (nome: string): Promise<Ator | null> => {
        try{
            const respose = await Api.get(`/ator/${nome}`);
            setAtor(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postAtor = async (ator: AtorCreate): Promise<Ator | null> => {
        try{
            const respose = await Api.post('/ator', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getAtorById = async (id: number): Promise<Ator | null> => {
        try{
            const respose = await Api.get(`/ator/${id}`);
            setAtor(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putAtor = async (id: number, dados: AtorCreate): Promise<any | null> => {
        try {
            const ator = { id, dados};
            const response = await Api.put('/usuario/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return error;
        }
    };
    const deleteAtor = async (id: number): Promise<any | null> => {
        try {
            const response = await Api.delete(`/ator/${id}`);
            return response.data;
        }catch (error){
            console.error('POST', error);
            return error;
        }
    }


    return{postAtor,putAtor,getAtorByName,getAtorById,getAtores, deleteAtor, atores, ator};
}
