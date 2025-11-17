"use client"

import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Search, Plus, Pencil, Trash2, UserPlus } from "lucide-react"
import Link from "next/link"
import {useUsuario} from "@/hooks/usuario";

import {useRouter} from "next/navigation";
import {TableClientes} from "@/components/tableClientes"

export default function UsuariosPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { getClientes, socios } = useUsuario();

    useEffect(() => {
        const fetchUsuarios = async () => {
            await getClientes()
        }
        fetchUsuarios()
    }, []);

    const filteredUsers = socios.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const columns = [
        { label: "Nome", key: "nome", className: "font-medium" },
        { label: "Telefone", key: "telefone" },
        { label: "Email", key: "email" },
        { label: "CPF", key: "cpf" },
        { label: "UF", key: "endereco.uf" },
        { label: "Cidade", key: "endereco.cidade" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Usuários</h1>
                    <p className="text-muted-foreground mt-1">Gerencie os usuários do sistema</p>
                </div>
                <Link href="/admin/usuarios/novo">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Usuário
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

            <TableClientes
                columns={columns}
                data={filteredUsers}
                actions={(user) => (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/admin/usuarios/${user.id}`)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>

                        <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <UserPlus className="h-4 w-4" />
                        </Button>
                    </>
                )}
                renderDependentes={(user) => (
                    user.dependentes?.length > 0 ? (
                        <div className="p-3">
                            <h3 className="font-semibold text-lg mb-2">Dependentes</h3>

                            <div className="space-y-2">
                                {user.dependentes.map((dep, i) => (
                                    <div key={i} className="border p-2 rounded-md bg-white">
                                        <div className="flex items-center gap-4">
                                            <span><strong>Nome:</strong> {dep.nome}</span>
                                            <span><strong>CPF:</strong> {dep.cpf}</span>
                                            <span><strong>Email:</strong> {dep.email}</span>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => router.push(`/admin/usuarios/${user.id}`)}
                                                className="ml-auto"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ) : (
                        <p className="text-muted-foreground p-3">
                            Nenhum dependente encontrado.
                        </p>
                    )
                )}
            />
        </div>
    );
}
