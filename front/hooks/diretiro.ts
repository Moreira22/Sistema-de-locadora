import Api from "@/server/server";
import {Diretor} from "@/model/diretor";
export const useDiretor = () =>{
    const getClasses = async (): Promise<Diretor[] | null> => {
        try{
            const respose = await Api.get('/diretor');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getClasseByName = async (nome: string): Promise<Diretor | null> => {
        try{
            const respose = await Api.get(`/diretor/${nome}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postClasse = async (diretor: Diretor): Promise<Diretor | null> => {
        try{
            const respose = await Api.post('/diretor/register', diretor);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getClasseById = async (id: number): Promise<Diretor | null> => {
        try{
            const respose = await Api.get(`/diretor/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putClasse = async (ator: Diretor): Promise<any | null> => {
        try {
            const response = await Api.put('/diretor/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{getClasseById,getClasseByName,getClasses,postClasse,putClasse};
}
