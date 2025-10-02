import Api from "@/server/server";
import {Classe} from "@/model/classe";
export const useClasse = () =>{
    const getClasses = async (): Promise<Classe[] | null> => {
        try{
            const respose = await Api.get('/classe');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getClasseByName = async (nome: string): Promise<Classe | null> => {
        try{
            const respose = await Api.get(`/classe/${nome}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postClasse = async (ator: Classe): Promise<Classe | null> => {
        try{
            const respose = await Api.post('/classe/register', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getClasseById = async (id: number): Promise<Classe | null> => {
        try{
            const respose = await Api.get(`/classe/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putClasse = async (ator: Classe): Promise<any | null> => {
        try {
            const response = await Api.put('/classe/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{getClasseById,getClasseByName,getClasses,postClasse,putClasse};
}
