"use client"
import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ClientSidebar } from "@/components/client-sidebar"
import {useEffect, useState} from "react";
import {FuncionarioSidebar} from "@/components/fincionario-sidebar";

export default function AdminLayout({children,}: { children: React.ReactNode }) {
    const [perfilId, setPerfilId] = useState<number | null>(null);
    useEffect(() => {
        // Recupera o usuário do localStorage
        const usuarioStr = localStorage.getItem("usuario");
        if (usuarioStr) {
            try {
                const usuario = JSON.parse(usuarioStr);
                setPerfilId(usuario.perfilId);
            } catch (error) {
                console.error("Erro ao ler usuário do localStorage:", error);
            }
        }else{
            setPerfilId(1);
        }
    }, []);

    const sidebarMap: Record<number, React.ComponentType> = {
        1: FuncionarioSidebar, // ==> Funcionario
        2: AdminSidebar,
        3: ClientSidebar,
        // adicione outros perfis aqui
    };

    const Sidebar = perfilId && sidebarMap[perfilId] ? sidebarMap[perfilId] : ClientSidebar;
    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    )
}
