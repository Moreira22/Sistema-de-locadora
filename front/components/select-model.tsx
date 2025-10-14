"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Plus } from "lucide-react";
interface SelectModelProps {
    titulo: string
    values: { id: number; nome: string }[]
    onSelect: (id: number) => void
    onCreate?: (nome: string) => Promise<void> | void
    onEdit?: (id: number, nome: string) => Promise<void> | void
}

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
})

type FormData = z.infer<typeof schema>

export function SelectModel({ titulo, values, onSelect, onCreate, onEdit }: SelectModelProps) {
    const [selectedId, setSelectedId] = useState<string | number | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    function handleSelectChange(value: string) {
        setSelectedId(value)
        onSelect(value)
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
            await onCreate(data.nome)
        }
        setOpenModal(false)
        reset()
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
                <Button variant="outline" size="icon" onClick={handleOpenEdit} disabled={!selectedId}>
                    <Pencil/>
                </Button>
            </div>

            {/* MODAL */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Editar" : "Cadastrar Novo"} {titulo}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" {...register("nome")} />
                            {errors.nome && (
                                <p className="text-sm text-red-500">{errors.nome.message}</p>
                            )}
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
