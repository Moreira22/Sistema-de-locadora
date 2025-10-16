"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import {SelectModel} from "@/components/select-model";
import {MultiSelectModel} from "@/components/multi-select-model"

import { useCategoria } from "@/hooks/categoria"
import { useClasse } from "@/hooks/classe"
import { Categoria } from "@/model/categoria"
import {Classe, ClasseLista} from "@/model/classe"
import {useDiretor} from "@/hooks/diretiro";
import {useAtor} from "@/hooks/ator";
import {Diretor} from "@/model/diretor";
import {Ator} from "@/model/ator";

interface FilmesFormPageProps {
    isEdit?: boolean
    temId?: number
}

export interface TituloCreate {
    id: number
    ano: number
    sinopse: string
    nome: string
    imagem: string
    classeId: number
    categoriaId: number
}

export interface ItemCreate {
    id: number
    numeroSerie: string
    dataAquisicao: string
    status: string
}

export interface CreateItem {
    titulo: TituloCreate
    itemList: ItemCreate[]
}

const schema = z.object({
    titulo: z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        ano: z.number().min(1900, "Ano inválido"),
        sinopse: z.string().min(1, "Sinopse é obrigatória"),
        classeId: z.number().optional(),
        imagem: z.string(),
    }),
    itemList: z.array(
        z.object({
            numeroSerie: z.string().min(1, "Número de série é obrigatório"),
            dataAquisicao: z.string(),
            status: z.enum(["DISPONIVEL", "LOCADO", "RESERVADO", "DANIFICADO", "PERDIDO"]),
        })
    ),
})

type FilmesFormData = z.infer<typeof schema>

export default function NovoFilmePage({ isEdit = false, temId }: FilmesFormPageProps) {
    const router = useRouter()
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [classes, setClasses] = useState<ClasseLista[]>([]);
    const [diretores, setDiretores] = useState<Diretor[]>([]);
    const [atores, setAtores] = useState<Ator[]>([]);
    const [idCategria, setIdCategoria] = useState<number>(null);
    const [idClasse, setIdClasse] = useState<number>(null);
    const [idDiretor, setIdDiretor] = useState<number>(null);
    const [idsAtores, setIdsAtores] = useState<number[]>([null]);
    const { getCategorias } = useCategoria();
    const { getClasses } = useClasse();
    const { getDiretor }= useDiretor();
    const {getAtores} = useAtor();

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FilmesFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            titulo: {
                nome: "",
                ano: new Date().getFullYear(),
                sinopse: "",
                imagem: "",
            },
            itemList: [
                { numeroSerie: "", dataAquisicao: new Date().toISOString().slice(0, 10), status: "DISPONIVEL" }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itemList"
    })

    useEffect(() => {
        const fetchDados = async () => {
            const cat = await getCategorias();
            const cls = await getClasses();
            const drt = await  getDiretor();
            const atr = await getAtores();
            setCategorias(cat);
            setClasses(cls);
            setDiretores(drt);
            setAtores(atr);
        }
        fetchDados()
    }, [])

    const onSubmit = async (data: FilmesFormData) => {
        const obj = {
            titulo: {
                ...data.titulo,
                categoriaId: idCategria,
                classeId: idClasse,
            },
            itemList: data.itemList,
            diretorId: idDiretor,
            atoresIds: idsAtores,
        }
        console.log("Dados prontos para envio:", obj)

        // Aqui você chamaria sua API para salvar o título e itens
        // router.push("/admin/filmes")
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/filmes">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {isEdit ? "Editar Filme" : "Novo Filme"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEdit ? "Edite os dados do filme" : "Cadastre um novo filme no sistema"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Filme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Nome, Ano, Sinopse */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome *</Label>
                                <Controller
                                    name="titulo.nome"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Nome do filme" />
                                    )}
                                />
                                {errors.titulo?.nome && <p className="text-red-500 text-sm">{errors.titulo.nome.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ano">Ano *</Label>
                                <Controller
                                    name="titulo.ano"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))} // <-- converte para number
                                        />
                                    )}
                                />
                                {errors.titulo?.ano && <p className="text-red-500 text-sm">{errors.titulo.ano.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sinopse">Sinopse *</Label>
                            <Controller
                                name="titulo.sinopse"
                                control={control}
                                render={({ field }) => (
                                    <Textarea {...field} rows={4} placeholder="Sinopse do filme" />
                                )}
                            />
                            {errors.titulo?.sinopse && <p className="text-red-500 text-sm">{errors.titulo.sinopse.message}</p>}
                        </div>

                        {/* Classe e Categoria */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <SelectModel
                                    titulo="Classes"
                                    values={classes}
                                    onSelect={(id) => setIdClasse(id)}
                                    onCreate={(nome) => console.log("Criado:", nome)}
                                    onEdit={(id, nome) => console.log("Editado:", id, nome)}
                                />
                            </div>
                            <div className="space-y-2">
                                <SelectModel
                                    titulo="Categorias"
                                    values={categorias}
                                    onSelect={(id) => setIdCategoria(id)}
                                    onCreate={(nome) => console.log("Criado:", nome)}
                                    onEdit={(id, nome) => console.log("Editado:", id, nome)}
                                />
                            </div>
                        </div>

                        {/* Imagem do Filme */}
                        <div className="space-y-2">
                            <Label htmlFor="imagem">Imagem / Poster</Label>
                            <div className="flex gap-2 items-center">
                                <Controller
                                    name="titulo.imagem"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-2 w-full">
                                            <div className="flex gap-2">
                                                <Input
                                                    {...field}
                                                    placeholder="URL da imagem"
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="gap-2"
                                                    onClick={() => {
                                                        const input = document.createElement("input");
                                                        input.type = "file";
                                                        input.accept = "image/*";
                                                        input.onchange = (e: any) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onload = () => {
                                                                    field.onChange(reader.result as string); // salva base64 no campo
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        };
                                                        input.click();
                                                    }}
                                                >
                                                    <Upload className="h-4 w-4" />
                                                    Upload
                                                </Button>
                                            </div>

                                            {/* Preview da imagem */}
                                            {field.value && (
                                                <div className="mt-2 flex justify-center">
                                                    <img
                                                        src={field.value}
                                                        alt="Pré-visualização do poster"
                                                        className="max-h-64 rounded-md shadow-md border border-gray-300 object-contain"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            {errors.titulo?.imagem && (
                                <p className="text-red-500 text-sm">{errors.titulo.imagem.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                {/* Diretor */}
                                <div>
                                    <SelectModel
                                        titulo="Diretor"
                                        values={diretores}
                                        onSelect={(id) => setIdDiretor(id)}
                                        onCreate={(nome) => console.log("Criado:", nome)}
                                        onEdit={(id, nome) => console.log("Editado:", id, nome)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                {/* Ator */}
                                <div>
                                    <MultiSelectModel
                                        titulo="Atores"
                                        values={atores ?? []}
                                        onSelect={(id) => setIdsAtores(id)}
                                        onCreate={(nome) => console.log("Criado:", nome)}
                                        onEdit={(id, nome) => console.log("Editado:", id, nome)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lista de Itens */}
                        <div className="space-y-4">
                            <Label>Itens do Filme</Label>
                            {fields.map((fieldItem, index) => (
                                <div key={fieldItem.id} className="grid grid-cols-3 gap-4 items-end">
                                    <Controller
                                        name={`itemList.${index}.numeroSerie`}
                                        control={control}
                                        render={({ field }) => <Input {...field} placeholder="Número de série" />}
                                    />
                                    <Controller
                                        name={`itemList.${index}.dataAquisicao`}
                                        control={control}
                                        render={({ field }) => <Input {...field} type="date" />}
                                    />
                                    <Controller
                                        name={`itemList.${index}.status`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="DISPONIVEL">DISPONIVEL</SelectItem>
                                                    <SelectItem value="LOCADO">LOCADO</SelectItem>
                                                    <SelectItem value="RESERVADO">RESERVADO</SelectItem>
                                                    <SelectItem value="DANIFICADO">DANIFICADO</SelectItem>
                                                    <SelectItem value="PERDIDO">PERDIDO</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <Button type="button" variant="destructive" onClick={() => remove(index)}>Remover</Button>
                                </div>
                            ))}
                            <Button type="button" onClick={() => append({ numeroSerie: "", dataAquisicao: new Date().toISOString().slice(0,10), status: "DISPONIVEL", id: 0 })}>
                                Adicionar Item
                            </Button>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1" disabled={isSubmitting}>Cadastrar Filme</Button>
                            <Link
                                href="/admin/filmes"
                                className="flex-1">
                                <Button type="button" variant="outline" className="w-full">Cancelar</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
