import Api from "@/server/server";
import {Diretor} from "@/model/diretor";
export const useDiretor = () =>{
    const getDiretor = async (): Promise<Diretor[] | null> => {
        try{
            const respose = await Api.get('/diretor');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getDiretorByName = async (nome: string): Promise<Diretor | null> => {
        try{
            const respose = await Api.get(`/diretor/${nome}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postDiretor = async (diretor: Diretor): Promise<Diretor | null> => {
        try{
            const respose = await Api.post('/diretor/register', diretor);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getDiretorById = async (id: number): Promise<Diretor | null> => {
        try{
            const respose = await Api.get(`/diretor/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putDiretor = async (ator: Diretor): Promise<any | null> => {
        try {
            const response = await Api.put('/diretor/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{getDiretorById, getDiretorByName, getDiretor, postDiretor, putDiretor};
}
