"use client"

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import UsuarioFormPage from "../novo/page"; // Reaproveita o componente de form
import { useUsuario } from "@/hooks/usuario";

export default function EditarUsuarioPage() {
    const router = useRouter();
    const { id } = useParams(); // id do usuário
    const { getUsuarioById } = useUsuario();

    useEffect(() => {
        const fetchUsuario = async () => {
            if (!id) return;
            const data = await getUsuarioById(Number(id));
            if (!data) {
                router.push("/admin/usuarios"); // se não encontrou
            } else {
                // Aqui você pode setar os valores do form via setValue do react-hook-form
                // Ex: setValue("nome", data.nome)
            }
        };
        fetchUsuario();
    }, [id]);

    return <UsuarioFormPage isEdit={true} usuarioId={Number(id)} />;
}
