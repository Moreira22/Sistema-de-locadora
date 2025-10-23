"use client"

import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Film, AlertCircle } from "lucide-react"
import {useItem} from "@/hooks/item";
import {useRouter} from "next/navigation";

export default function FilmesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const {getItems, itens } = useItem();
    const router = useRouter();

    const filteredMovies = itens?.filter(
        (movie) =>
            movie.titulo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.titulo.categoriaNome.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

    useEffect(() => {
        const fetchItem = async () => {
            await getItems()
        }
        fetchItem()
    }, [])

    const statusVariantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        DISPONIVEL: "default",
        LOCADO: "outline",
        RESERVADO: "secondary",
        DANIFICADO: "destructive",
        PERDIDO: "destructive",
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Filmes</h1>
                    <p className="text-muted-foreground mt-1">Gerencie o catálogo de filmes</p>
                </div>
                <Link href="/admin/filmes/novo">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Filme
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por título ou gênero..."
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
                            <TableHead>Poster</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Ano</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Classe</TableHead>
                            <TableHead>N. Serie</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredMovies.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell>
                                    <div className="relative w-12 h-16 rounded overflow-hidden">
                                        {movie.titulo.imagem ? (
                                            <Image
                                                src={`data:image/jpeg;base64,${movie.titulo.imagem}`}
                                                alt={movie.titulo.nome}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Film className="w-12 h-12 text-gray-400" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{movie.titulo.nome}</TableCell>
                                <TableCell>{movie.titulo.ano}</TableCell>
                                <TableCell>{movie.titulo.categoriaNome}</TableCell>
                                <TableCell>{movie.titulo.classeNome}</TableCell>
                                <TableCell>{movie.numeroSerie}</TableCell>
                                <TableCell>
                                    <Badge variant={movie.status ? statusVariantMap[movie.status] : "secondary"}>
                                        {movie.status ?? "Sem status"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon"
                                                onClick={() => router.push(`/admin/filmes/${movie.id}`)}>
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
