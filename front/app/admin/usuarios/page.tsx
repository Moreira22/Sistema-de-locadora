"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

interface User {
    id: number
    nome: string
    email: string
    telefone: string
    status: "ativo" | "inativo"
    dataCadastro: string
}

export default function UsuariosPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // Dados de exemplo
    const [usuarios] = useState<User[]>([
        {
            id: 1,
            nome: "João Silva",
            email: "joao@email.com",
            telefone: "(11) 98765-4321",
            status: "ativo",
            dataCadastro: "15/01/2024",
        },
        {
            id: 2,
            nome: "Maria Santos",
            email: "maria@email.com",
            telefone: "(11) 97654-3210",
            status: "ativo",
            dataCadastro: "20/01/2024",
        },
        {
            id: 3,
            nome: "Pedro Oliveira",
            email: "pedro@email.com",
            telefone: "(11) 96543-2109",
            status: "inativo",
            dataCadastro: "10/01/2024",
        },
    ])

    const filteredUsers = usuarios.filter(
        (user) =>
            user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data Cadastro</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.nome}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.telefone}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === "ativo" ? "default" : "secondary"}>{user.status}</Badge>
                                </TableCell>
                                <TableCell>{user.dataCadastro}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
