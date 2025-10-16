import Api from "@/server/server";
import {Classe, ClasseCreate, ClasseLista} from "@/model/classe";
import {useState} from "react";
export const useClasse = () =>{
    const [classes, setClasses] = useState<ClasseLista[]>([]);
    const [classe, setClasse] = useState<Classe>();
    const getClasses = async (): Promise<Classe[] | null> => {
        try{
            const respose = await Api.get('/classe');
            setClasses(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getClasseByName = async (nome: string): Promise<Classe | null> => {
        try{
            const respose = await Api.get(`/classe/${nome}`);
            setClasse(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postClasse = async (ator: ClasseCreate): Promise<Classe | null> => {
        try{
            const respose = await Api.post('/classe', ator);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getClasseById = async (id: number): Promise<Classe | null> => {
        try{
            const respose = await Api.get(`/classe/${id}`);
            setClasse(respose.data);
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
    const deleteClasse = async (id: number): Promise<any | null> => {
        try {
            const response = await Api.delete(`/classe/${id}`);
            return response.data;
        }catch (error){
            console.error('Delete', error);
            return error;
        }
    }

    return{getClasseById,getClasseByName,getClasses,postClasse,putClasse, deleteClasse, classes, classe};
}
