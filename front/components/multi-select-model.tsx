"use client"

import React, { useState } from "react";
import {Controller, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Pencil, Plus } from "lucide-react";

interface MultiSelectModelProps {
    titulo: string
    values: { id: number; nome: string }[]
    onSelect: (ids: number[]) => void
    onCreate?: (nome: string) => Promise<void> | void
    onEdit?: (id: number, nome: string) => Promise<void> | void
}

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
})

type FormData = z.infer<typeof schema>

export function MultiSelectModel({ titulo, values, onSelect, onCreate, onEdit }: MultiSelectModelProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const handleSelectChange = (selected: any) => {
        const ids = selected ? selected.map((s: any) => s.value) : []
        setSelectedIds(ids)
        onSelect(ids)
    }

    function handleOpenCreate() {
        setIsEditing(false)
        reset()
        setOpenModal(true)
    }

    function handleOpenEdit() {
        if (selectedIds.length !== 1) return
        const selectedItem = values.find(v => v.id === selectedIds[0])
        if (selectedItem) {
            setIsEditing(true)
            setEditingId(selectedItem.id)
            reset({ nome: selectedItem.nome })
            setOpenModal(true)
        }
    }

    async function onSubmit(data: FormData) {
        if (isEditing && editingId && onEdit) {
            await onEdit(editingId, data.nome)
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
                <div className="w-[250px]">
                    <Select
                        isMulti
                        options={values.map(v => ({ label: v.nome, value: v.id }))}
                        onChange={handleSelectChange}
                        value={values.filter(v => selectedIds.includes(v.id)).map(v => ({ label: v.nome, value: v.id }))}
                        placeholder={`Selecione ${titulo}`}
                        classNamePrefix="react-select"
                    />
                </div>

                <Button variant="outline" size="icon" onClick={handleOpenCreate}>
                    <Plus/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleOpenEdit}
                    disabled={selectedIds.length !== 1}
                >
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

                        <DialogFooter>
                            <Button type="submit">{isEditing ? "Salvar alterações" : "Cadastrar"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
