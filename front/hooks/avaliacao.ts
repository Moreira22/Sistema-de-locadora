import Api from "@/server/server";
import {Avaliacao} from "@/model/avaliacao";
export const useAvaliacao = () =>{
    const getAvaliacao = async (): Promise<Avaliacao[] | null> => {
        try{
            const respose = await Api.get('/avaliacao');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };

    const postAvaliacao = async (diretor: Avaliacao): Promise<Avaliacao | null> => {
        try{
            const respose = await Api.post('/avaliacao/register', diretor);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getAvaliacaoById = async (id: number): Promise<Avaliacao | null> => {
        try{
            const respose = await Api.get(`/avaliacao/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putAvaliacao = async (ator: Avaliacao): Promise<any | null> => {
        try {
            const response = await Api.put('/avaliacao/update', ator);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{getAvaliacaoById, getAvaliacao, postAvaliacao, putAvaliacao};

}
