"use client"

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import NovoFilmePage from "../novo/page"; // Reaproveita o componente de form
import {useItem} from "@/hooks/item";

export default function EditarUsuarioPage() {
    const router = useRouter();
    const { id } = useParams(); // id do usuário
    const { getItemById } = useItem();

    useEffect(() => {
        const fetchUsuario = async () => {
            if (!id) return;
            const data = await getItemById(Number(id));
            if (!data) {
                router.push("/admin/filmes");
            } else {
                // Aqui você pode setar os valores do form via setValue do react-hook-form
                // Ex: setValue("nome", data.nome)
            }
        };
        fetchUsuario();
    }, [id]);

    return <NovoFilmePage isEdit={true} temId={Number(id)} />;
}
