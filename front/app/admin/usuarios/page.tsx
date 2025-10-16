"use client"

import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import {useUsuario} from "@/hooks/usuario";
import {Usuario} from "@/model/usuario";
import {useRouter} from "next/navigation";

export default function UsuariosPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { getUsuarios, getUsuarioByNome, usuarios } = useUsuario();
    // const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            await getUsuarios()
            console.log("Usuarios API:", usuarios) // verifique estrutura
        }
        fetchUsuarios()
    }, []);

    const filteredUsers = usuarios.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

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

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.nome}</TableCell>
                                <TableCell>{user.telefone}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.ativo ? "default" : "secondary"}>
                                        {user.ativo ? "Ativo" : "Inativo"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon"
                                                onClick={() => router.push(`/admin/usuarios/${user.id}`)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Nenhum usuário encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
