import Api from "@/server/server";
import {Locacao} from "@/model/locacao";
import {useState} from "react";
export const useLocacao = () =>{
    const [locacoes, setLocacoes] = useState<Locacao[]>([]);
    const [locacao, setLocacao] = useState<Locacao>();

    const getLocacao = async (): Promise<Locacao[] | null> => {
        try{
            const respose = await Api.get('/locacao');
            setLocacoes(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };

    const postLocacao = async (ator: Locacao): Promise<Locacao | null> => {
        try{
            const respose = await Api.post('/locacao', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getLocacaoById = async (id: number): Promise<Locacao | null> => {
        try{
            const respose = await Api.get(`/locacao/${id}`);
            setLocacao(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };

    return{getLocacaoById,getLocacao,postLocacao, locacoes, locacao};
}
