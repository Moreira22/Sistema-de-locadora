import Api from "@/server/server";
import {Diretor, DiretorCreate} from "@/model/diretor";
import {useState} from "react";
export const useDiretor = () =>{
    const [diretores, setDiretores] = useState<Diretor[]>([]);
    const [diretore, setDiretore] = useState<Diretor>();
    const getDiretor = async (): Promise<Diretor[] | null> => {
        try{
            const respose = await Api.get('/diretor');
            setDiretores(respose.data)
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getDiretorByName = async (nome: string): Promise<Diretor | null> => {
        try{
            const respose = await Api.get(`/diretor/${nome}`);
            setDiretore(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postDiretor = async (diretor: DiretorCreate): Promise<Diretor | null> => {
        try{
            const respose = await Api.post('/diretor', diretor);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getDiretorById = async (id: number): Promise<Diretor | null> => {
        try{
            const respose = await Api.get(`/diretor/${id}`);
            setDiretore(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putDiretor = async ( id: number, dados: DiretorCreate): Promise<any | null> => {
        try {
            const diretor = { id, dados};
            const response = await Api.put('/diretor/update', diretor);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };
    const deleteDiretor = async (id: number): Promise<any | null> => {
        try {
            const response = await Api.delete(`/diretor/${id}`);
            return response.data;
        }catch (error){
            console.error('Delete', error);
            return error;
        }
    }

    return{getDiretorById, getDiretorByName, getDiretor, postDiretor, putDiretor, deleteDiretor, diretores, diretore};
}
