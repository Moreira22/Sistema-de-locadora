"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Film, User, Calendar, DollarSign } from "lucide-react"
import {Usuario} from "@/model/usuario";

interface LocacaoFormProps {
    usuarios: any[];
    itens: any[];
    onSubmit?: (data: any) => void;
}

export default function LocacaoForm({ usuarios, itens, onSubmit}: LocacaoFormProps) {

    const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(null)
    const [filmesSelecionados, setFilmesSelecionados] = useState<number[]>([]);
    const [dataPrevista, setDataPrevista] = useState<string>("");
    const [dataDevolucao, setDataDevolucao] = useState<string>("");

    useEffect(() => {
        const fetchDados = async () => {
        }
        fetchDados()
    }, [])

    const cliente = usuarios.find((c) => c.id === clienteSelecionado)

    const valorTotal = filmesSelecionados.reduce((total, filmeId) => {
        const filme = itens.find((f) => f.id === filmeId)
        return total + (filme?.titulo.classe.valor || 0)
    }, 0)

    const handleFilmeToggle = (filmeId: number) => {
        setFilmesSelecionados((prev) =>
            prev.includes(filmeId)
                ? prev.filter((id) => id !== filmeId)
                : [...prev, filmeId]
        )
    }

    const handleSubmit = () => {
        if (!clienteSelecionado || filmesSelecionados.length === 0 || !dataPrevista) {
            alert("Por favor, preencha todos os campos obrigatórios")
            return
        }

        const data = {
            cliente: clienteSelecionado,
            filmes: filmesSelecionados,
            dataPrevista,
            dataDevolucao,
            valorTotal,
        }

        if (onSubmit) onSubmit(data)

        alert("Locação registrada com sucesso!")
    }

    return (
        <div className="container mx-auto p-6 max-w-12xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Locação de Filmes</h1>
                <p className="text-muted-foreground">Selecione o cliente e os filmes para realizar a locação</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Seleção de Cliente */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="p-6">
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Selecionar Cliente
                            </CardTitle>
                            <CardDescription>Escolha o cliente que está realizando a locação</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <Label>Cliente</Label>
                                <Select
                                    value={clienteSelecionado ? String(clienteSelecionado) : ""}
                                    onValueChange={(value) => setClienteSelecionado(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {usuarios.map((cliente) => (
                                            <SelectItem key={cliente.id} value={String(cliente.id)}>
                                                {cliente.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dados do Cliente */}
                    {cliente && (
                        <Card className="border-primary/20 bg-primary/5">
                            <CardHeader className="p-6">
                                <CardTitle className="text-lg">Dados do Cliente</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nome</p>
                                        <p className="font-medium">{cliente.nome}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">CPF</p>
                                        <p className="font-medium">{cliente.cpf}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{cliente.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Telefone</p>
                                        <p className="font-medium">{cliente.telefone}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Datas e Valor */}
                    <Card>
                        <CardHeader className="p-6">
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Informações da Locação
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Data Prevista de Devolução *</Label>
                                <Input
                                    type="date"
                                    value={dataPrevista}
                                    onChange={(e) => setDataPrevista(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Data de Devolução</Label>
                                <Input
                                    type="date"
                                    value={dataDevolucao}
                                    onChange={(e) => setDataDevolucao(e.target.value)}
                                />
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-lg font-semibold">Valor Total</span>
                                    </div>
                                    <span className="text-2xl font-bold text-primary">
                                        R$ {valorTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Seleção de Filmes */}
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Film className="h-5 w-5" />
                                Selecionar Filmes
                            </CardTitle>
                            <CardDescription>Escolha um ou mais filmes para a locação</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {itens.map((filme) => (
                                    <div
                                        key={filme.id}
                                        className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <Checkbox
                                            id={`filme-${filme.id}`}
                                            checked={filmesSelecionados.includes(filme.id)}
                                            onCheckedChange={() => handleFilmeToggle(filme.id)}
                                        />
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-base font-semibold cursor-pointer">
                                                {filme.titulo.nome}
                                            </Label>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>{filme.titulo.ano}</span>
                                                <span>•</span>
                                                <span>{filme?.titulo?.categoria?.nome || "Sem categoria"}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-primary">
                                                R$ {filme.titulo.classe.valor.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Botão de Confirmar */}
            <div className="mt-6 flex justify-end">
                <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!clienteSelecionado || filmesSelecionados.length === 0 || !dataPrevista}
                    className="min-w-[200px]"
                >
                    Confirmar Locação
                </Button>
            </div>
        </div>
    )
}
