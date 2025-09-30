"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Movie {
    id: number
    titulo: string
    ano: number
    genero: string
    duracao: string
    disponivel: boolean
    poster: string
    precoLocacao: string
}

export default function FilmesPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // Dados de exemplo
    const [filmes] = useState<Movie[]>([
        {
            id: 1,
            titulo: "A Origem",
            ano: 2010,
            genero: "Ficção Científica",
            duracao: "148 min",
            disponivel: true,
            poster: "/inception-movie-poster.png",
            precoLocacao: "R$ 12,90",
        },
        {
            id: 2,
            titulo: "Matrix",
            ano: 1999,
            genero: "Ficção Científica",
            duracao: "136 min",
            disponivel: true,
            poster: "/matrix-movie-poster.png",
            precoLocacao: "R$ 9,90",
        },
        {
            id: 3,
            titulo: "Interestelar",
            ano: 2014,
            genero: "Ficção Científica",
            duracao: "169 min",
            disponivel: false,
            poster: "/interstellar-movie-poster.png",
            precoLocacao: "R$ 14,90",
        },
    ])

    const filteredMovies = filmes.filter(
        (movie) =>
            movie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.genero.toLowerCase().includes(searchTerm.toLowerCase()),
    )

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
                            <TableHead>Gênero</TableHead>
                            <TableHead>Duração</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredMovies.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell>
                                    <div className="relative w-12 h-16 rounded overflow-hidden">
                                        <Image src={movie.poster || "/placeholder.svg"} alt={movie.titulo} fill className="object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{movie.titulo}</TableCell>
                                <TableCell>{movie.ano}</TableCell>
                                <TableCell>{movie.genero}</TableCell>
                                <TableCell>{movie.duracao}</TableCell>
                                <TableCell>{movie.precoLocacao}</TableCell>
                                <TableCell>
                                    <Badge variant={movie.disponivel ? "default" : "secondary"}>
                                        {movie.disponivel ? "Disponível" : "Indisponível"}
                                    </Badge>
                                </TableCell>
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
