"use client"

import React, { useState } from "react";
import {Controller, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash } from "lucide-react";
interface SelectClasseProps {
    titulo: string
    values: { id: number; nome: string }[]
    onSelect: (id: number) => void
    onCreate?: (nome: string, valor: number, prazoDevolucao: number) => Promise<void> | void
    onEdit?: (id: number, nome: string) => Promise<void> | void
    onDelete: (id: number) => void
}

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    valor: z.number().min(1, "Valor é obrigatório"),
    prazoDevolucao:  z.number().min(1, "Pazo Devolução é obrigatório"),
})

type FormData = z.infer<typeof schema>

export function SelectClasse({ titulo, values, onSelect, onCreate, onEdit, onDelete }: SelectClasseProps) {
    const [selectedId, setSelectedId] = useState< number | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    function handleSelectChange(value: string) {
        setSelectedId(Number(value))
        onSelect(Number(value));
    }

    function handleOpenCreate() {
        setIsEditing(false)
        reset()
        setOpenModal(true)
    }

    function handleOpenEdit() {
        if (!selectedId) return
        const selectedItem = values.find(v => v.id === selectedId)
        if (selectedItem) {
            setIsEditing(true)
            reset({ nome: selectedItem.nome })
            setOpenModal(true)
        }
    }

    async function onSubmit(data: FormData) {
        if (isEditing && selectedId && onEdit) {
            await onEdit(selectedId, data.nome)
        } else if (!isEditing && onCreate) {
            await onCreate(data.nome, data.valor, data.prazoDevolucao)
        }
        setOpenModal(false)
        reset()
    }
    function handleOpenDelete(){
        if (!selectedId) return
        if (selectedId) {
            onDelete(selectedId);
        }
    }

    return (
        <div className="flex flex-col space-y-2 w-full">
            <Label>{titulo} *</Label>
            <div className="flex items-center gap-2">
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder={`Selecione ${titulo}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {values.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                                {item.nome}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button variant="outline" size="icon" onClick={handleOpenCreate}>
                    <Plus/>
                </Button>
                <Button variant="outline" size="icon"
                        onClick={handleOpenEdit}
                        disabled={!selectedId}>
                    <Pencil/>
                </Button>
                <Button variant="outline" size="icon" onClick={handleOpenDelete}>
                    <Trash/>
                </Button>
            </div>

            {/* MODAL */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Editar" : "Cadastrar Novo"} {titulo}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome *</Label>
                            <Controller
                                name="nome"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Nome do filme" />
                                )}
                            />
                            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="valor">Valor *</Label>
                                <Controller
                                    name="valor"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="valor da classe"
                                               type="number"
                                               onChange={(e) => field.onChange(Number(e.target.value))}/>
                                    )}
                                />
                                {errors.valor && <p className="text-red-500 text-sm">{errors.valor.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="valor">Prazo Devolução*</Label>
                                <Controller
                                    name="prazoDevolucao"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Prazo Devolução da classe"
                                               type="number"
                                               onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    )}
                                />
                                {errors.prazoDevolucao && <p className="text-red-500 text-sm">{errors.prazoDevolucao.message}</p>}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit" disabled={false}>
                                {isEditing ? "Salvar alterações" : "Cadastrar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
