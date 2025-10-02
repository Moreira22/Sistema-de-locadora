import Api from "@/server/server";
import {Ator} from "@/model/ator";
export const useAtor = () =>{
    const getAtores = async (): Promise<Ator[] | null> => {
        try{
            const respose = await Api.get('/ator');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getAtorByName = async (nome: string): Promise<Ator | null> => {
        try{
            const respose = await Api.get(`/ator/${nome}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postAtor = async (ator: Ator): Promise<Ator | null> => {
        try{
            const respose = await Api.post('/ator/register', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getAtorById = async (id: number): Promise<Ator | null> => {
        try{
            const respose = await Api.get(`/ator/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putAtor = async (ator: Ator): Promise<any | null> => {
        try {
            const response = await Api.put('/usuario/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{postAtor,putAtor,getAtorByName,getAtorById,getAtores};
}
