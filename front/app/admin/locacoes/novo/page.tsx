"use client"

import { useEffect, useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Film, User, Calendar, DollarSign } from "lucide-react"
import { useUsuario } from "@/hooks/usuario"
import { useItem } from "@/hooks/item"

export default function UsuariosPage() {
    const { getUsuarios, getDependente, usuarios, dependentes } = useUsuario();
    const { getItemsDisponivel, itens } = useItem();

    const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(null)
    const [dependenteSelecionado, setDependenteSelecionado] = useState<number | null>(null)

    const [filmesSelecionados, setFilmesSelecionados] = useState<number[]>([]);
    const [dataPrevista, setDataPrevista] = useState<string>("");
    const [dataDevolucao, setDataDevolucao] = useState<string>("");

    // Carrega Dados
    useEffect(() => {
        const fetchDados = async () => {
            await getUsuarios();
            await getItemsDisponivel();
            await getDependente();
        }
        fetchDados()
    }, [])

    // Cliente selecionado final (cliente ou dependente)
    const clienteFinalId = clienteSelecionado ?? dependenteSelecionado;

    const clienteFinal = usuarios.find((u) => u.id === clienteFinalId)
        || dependentes.find((d) => d.id === clienteFinalId);

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
        if (!clienteFinalId || filmesSelecionados.length === 0 || !dataPrevista) {
            alert("Por favor, preencha todos os campos obrigatórios")
            return
        }

        console.log({
            cliente: clienteFinalId,
            filmes: filmesSelecionados,
            dataPrevista,
            dataDevolucao,
            valorTotal,
            tipo: clienteSelecionado ? "CLIENTE" : "DEPENDENTE"
        })

        alert("Locação registrada com sucesso!")
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-balance mb-2">Locação de Filmes</h1>
                <p className="text-muted-foreground text-pretty">
                    Selecione o cliente e os filmes para realizar a locação
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* SELEÇÃO DE CLIENTE */}
                <div className="space-y-6">

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Selecionar Cliente
                            </CardTitle>
                            <CardDescription>Escolha entre Cliente ou Dependente</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Accordion type="single" collapsible>

                                {/* CLIENTE */}
                                <AccordionItem value="cliente">
                                    <AccordionTrigger>Cliente</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-2 mt-3">
                                            <Label>Cliente</Label>
                                            <Select
                                                value={clienteSelecionado ? String(clienteSelecionado) : ""}
                                                onValueChange={(value) => {
                                                    setClienteSelecionado(Number(value))
                                                    setDependenteSelecionado(null)
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um cliente" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {usuarios.map((u) => (
                                                        <SelectItem key={u.id} value={String(u.id)}>
                                                            {u.nome}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* DEPENDENTE */}
                                <AccordionItem value="dependente">
                                    <AccordionTrigger>Dependente</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-2 mt-3">
                                            <Label>Dependente</Label>

                                            <Select
                                                value={dependenteSelecionado ? String(dependenteSelecionado) : ""}
                                                onValueChange={(value) => {
                                                    setDependenteSelecionado(Number(value))
                                                    setClienteSelecionado(null)
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um dependente" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {dependentes.map((d) => (
                                                        <SelectItem key={d.id} value={String(d.id)}>
                                                            {d.nome}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* DADOS DO CLIENTE */}
                    {clienteFinal && (
                        <Card className="border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg">Dados do Cliente</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Nome</p>
                                    <p className="font-medium">{clienteFinal.nome}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{clienteFinal.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Telefone</p>
                                    <p className="font-medium">{clienteFinal.telefone}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* DATAS */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Informações da Locação
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <Label>Data Prevista *</Label>
                                <Input
                                    type="date"
                                    value={dataPrevista}
                                    onChange={(e) => setDataPrevista(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label>Data de Devolução</Label>
                                <Input
                                    type="date"
                                    value={dataDevolucao}
                                    onChange={(e) => setDataDevolucao(e.target.value)}
                                />
                            </div>

                            <div className="pt-3 border-t flex justify-between">
                                <span className="flex items-center gap-2 font-semibold">
                                    <DollarSign className="h-5 w-5" /> Valor Total
                                </span>
                                <span className="text-2xl font-bold text-primary">
                                    R$ {valorTotal.toFixed(2)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* SELEÇÃO DE FILMES */}
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Film className="h-5 w-5" />
                                Selecionar Filmes
                            </CardTitle>
                            <CardDescription>Escolha um ou mais filmes</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-3">
                                {itens.map((filme) => (
                                    <div
                                        key={filme.id}
                                        className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <Checkbox
                                            checked={filmesSelecionados.includes(filme.id)}
                                            onCheckedChange={() => handleFilmeToggle(filme.id)}
                                        />

                                        <div className="flex-1 space-y-1">
                                            <p className="text-base font-semibold">{filme.titulo.nome}</p>

                                            <div className="text-sm text-muted-foreground flex gap-2">
                                                <span>{filme.titulo.ano}</span>
                                                <span>•</span>
                                                <span>{filme.titulo.categoria?.nome}</span>
                                                <span>•</span>
                                                <span>{filme.numeroSerie}</span>
                                            </div>
                                        </div>

                                        <p className="font-bold text-primary">
                                            R$ {filme.titulo.classe.valor.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* BOTÃO */}
            <div className="mt-6 flex justify-end">
                <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!clienteFinalId || filmesSelecionados.length === 0 || !dataPrevista}
                >
                    Confirmar Locação
                </Button>
            </div>
        </div>
    )
}
