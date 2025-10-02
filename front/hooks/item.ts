import Api from "@/server/server";
import {Item} from "@/model/item";
import {Titulo} from "@/model/titulo";
export const useItem = () =>{
    const getItems = async (): Promise<Item[] | null> => {
        try{
            const respose = await Api.get('/item');
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const postItem = async (item: Item): Promise<Item | null> => {
        try{
            const respose = await Api.post('/item/register', item);
            return respose.data;
        }catch (error){
            console.error('GET', error);
            return null;
        }
    };
    const getItemById = async (id: number): Promise<Item | null> => {
        try{
            const respose = await Api.get(`/item/${id}`);
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

    return{getItems,postItem,getItemById,putitem};
}
