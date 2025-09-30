"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NovoFilmePage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        titulo: "",
        ano: "",
        genero: "",
        diretor: "",
        duracao: "",
        sinopse: "",
        classificacao: "",
        precoLocacao: "",
        disponivel: "true",
        poster: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("[v0] Cadastrando filme:", formData)
        // Aqui você adicionaria a lógica para salvar no banco de dados
        router.push("/admin/filmes")
    }

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/filmes">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Novo Filme</h1>
                    <p className="text-muted-foreground mt-1">Adicione um novo filme ao catálogo</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Filme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="titulo">Título *</Label>
                                <Input
                                    id="titulo"
                                    value={formData.titulo}
                                    onChange={(e) => handleChange("titulo", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ano">Ano *</Label>
                                <Input
                                    id="ano"
                                    type="number"
                                    value={formData.ano}
                                    onChange={(e) => handleChange("ano", e.target.value)}
                                    placeholder="2024"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="genero">Gênero *</Label>
                                <Select value={formData.genero} onValueChange={(value) => handleChange("genero", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o gênero" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acao">Ação</SelectItem>
                                        <SelectItem value="aventura">Aventura</SelectItem>
                                        <SelectItem value="comedia">Comédia</SelectItem>
                                        <SelectItem value="drama">Drama</SelectItem>
                                        <SelectItem value="ficcao">Ficção Científica</SelectItem>
                                        <SelectItem value="terror">Terror</SelectItem>
                                        <SelectItem value="romance">Romance</SelectItem>
                                        <SelectItem value="suspense">Suspense</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="diretor">Diretor *</Label>
                                <Input
                                    id="diretor"
                                    value={formData.diretor}
                                    onChange={(e) => handleChange("diretor", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duracao">Duração (minutos) *</Label>
                                <Input
                                    id="duracao"
                                    type="number"
                                    value={formData.duracao}
                                    onChange={(e) => handleChange("duracao", e.target.value)}
                                    placeholder="120"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="classificacao">Classificação *</Label>
                                <Select value={formData.classificacao} onValueChange={(value) => handleChange("classificacao", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="livre">Livre</SelectItem>
                                        <SelectItem value="10">10 anos</SelectItem>
                                        <SelectItem value="12">12 anos</SelectItem>
                                        <SelectItem value="14">14 anos</SelectItem>
                                        <SelectItem value="16">16 anos</SelectItem>
                                        <SelectItem value="18">18 anos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sinopse">Sinopse *</Label>
                            <Textarea
                                id="sinopse"
                                value={formData.sinopse}
                                onChange={(e) => handleChange("sinopse", e.target.value)}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="precoLocacao">Preço de Locação (R$) *</Label>
                                <Input
                                    id="precoLocacao"
                                    type="number"
                                    step="0.01"
                                    value={formData.precoLocacao}
                                    onChange={(e) => handleChange("precoLocacao", e.target.value)}
                                    placeholder="12.90"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="disponivel">Disponibilidade</Label>
                                <Select value={formData.disponivel} onValueChange={(value) => handleChange("disponivel", value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Disponível</SelectItem>
                                        <SelectItem value="false">Indisponível</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="poster">Poster do Filme</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="poster"
                                    value={formData.poster}
                                    onChange={(e) => handleChange("poster", e.target.value)}
                                    placeholder="URL da imagem ou faça upload"
                                    className="flex-1"
                                />
                                <Button type="button" variant="outline" className="gap-2 bg-transparent">
                                    <Upload className="h-4 w-4" />
                                    Upload
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1">
                                Cadastrar Filme
                            </Button>
                            <Link href="/admin/filmes" className="flex-1">
                                <Button type="button" variant="outline" className="w-full bg-transparent">
                                    Cancelar
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
