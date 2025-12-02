import Api from "@/server/server";
import {Item} from "@/model/item";
import {Titulo, CreateItem} from '@/model/titulo';
import {useState} from "react";
export const useItem = () =>{
    // List
    const [itens, setItens] = useState<Item[]>([]);
    //
    // By id / nome
    const [item, setItem] = useState<Item>();
    const [filmes, setFilmes] = useState<Titulo[]>([]);

    const getItems = async (): Promise<Item[] | null> => {
        try{
            const respose = await Api.get('/item');
            setItens(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getFilmes = async (): Promise<Titulo[] | null> => {
        try{
            const respose = await Api.get('/titulo');
            setFilmes(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getItensDisponiovel = async (): Promise<Item[] | null> => {
        try{
            const respose = await Api.get('/item/disponivel');
            setItens(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getItemsDisponivel = async (): Promise<Item[] | null> => {
        try{
            const respose = await Api.get('/item/disponivel');
            setItens(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postItem = async (item: CreateItem): Promise<CreateItem | null> => {
        try{
            const respose = await Api.post('/titulo', item);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getItemById = async (idItem?: number): Promise<Item | null> => {
        try{
            const respose = await Api.get(`/item/${idItem}`);
            setItem(respose.data);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const putitem = async (item: Item): Promise<any | null> => {
        try {
            const response = await Api.put('/item/update', item);
            return response.data;
        } catch (error) {
            console.error('POST', error);
            return null;
        }
    };

    return{getItems, postItem, getItemById, putitem, getItemsDisponivel, getItensDisponiovel, getFilmes, itens, item, filmes,};
}
