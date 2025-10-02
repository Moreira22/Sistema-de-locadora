import Api from "@/server/server";
import {Notificacao} from "@/model/notificacao";
export const useNotificacao = () =>{
    const getNotificacao = async (): Promise<Notificacao[] | null> => {
        try{
            const respose = await Api.get('/notificacao');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };

    const postNotificacao = async (notificacao: Notificacao): Promise<Notificacao | null> => {
        try{
            const respose = await Api.post('/notificacao/register', notificacao);
            return respose.data;
        }catch (error){
            console.error('Post', error);
            return null;
        }
    };
    const getNotificacaoById = async (id: number): Promise<Notificacao | null> => {
        try{
            const respose = await Api.get(`/notificacao/${id}`);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putNotificacao = async (notificacao: Notificacao): Promise<any | null> => {
        try {
            const response = await Api.put('/notificacao/update', notificacao);
            return response.data;
        } catch (error) {
            console.error('PUT', error);
            return null;
        }
    };

    return{getNotificacaoById, getNotificacao, postNotificacao, putNotificacao};

}
