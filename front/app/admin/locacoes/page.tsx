"use client"

import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Search, Plus, Pencil, Trash2, UserPlus} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation";
import {useLocacao} from "@/hooks/locacao";
import {TableLocacao} from "@/components/tableLocacao";

export default function UsuariosPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const {getLocacao, locacoes} = useLocacao();


    useEffect(() => {
        const fetchUsuarios = async () => {
            await getLocacao();

        }
        fetchUsuarios()
    }, []);

    const filteredLocacao = locacoes.filter(locacao =>
        locacao.item.titulo.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const columns = [
        { label: "Filme", key: "item.titulo.nome", className: "font-medium" },
        { label: "Data Locação", key: "dataLocaoa" },
        { label: "Locador Socio", key: "usuario.nome" },
        { label: "Locador Dependente", key: "dependente.nome" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Locação</h1>
                    <p className="text-muted-foreground mt-1">Gerencie os locação</p>
                </div>
                <Link href="/admin/locacoes/novo">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Locação
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="border rounded-lg bg-card">
                <TableLocacao
                    columns={columns}
                    data={filteredLocacao}
                    actions={(user) => (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setSelectedId(user.id)  // << envia ID do dependente
                                }}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>

                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    />
            </div>
        </div>
    );
}
