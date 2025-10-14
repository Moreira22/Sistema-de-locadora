"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
    const [popoverOpen, setPopoverOpen] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    function toggleSelection(id: number) {
        setSelectedIds(prev => {
            const newSelection = prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
            onSelect(newSelection)
            return newSelection
        })
    }

    function handleOpenCreate() {
        setIsEditing(false)
        reset()
        setOpenModal(true)
    }

    function handleOpenEdit() {
        if (selectedIds.length !== 1) return // só pode editar 1 por vez
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
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-[250px] justify-start text-left font-normal",
                                selectedIds.length === 0 && "text-muted-foreground"
                            )}
                        >
                            {selectedIds.length === 0
                                ? `Selecione ${titulo}`
                                : `${selectedIds.length} selecionado${selectedIds.length > 1 ? "s" : ""}`}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-2">
                        <div className="flex flex-col gap-1">
                            {Array.isArray(values) && values.length > 0 ? (
                                values.map((item) => (
                                    <label
                                        key={item.id}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <Checkbox
                                            checked={selectedIds.includes(item.id)}
                                            onCheckedChange={() => toggleSelection(item.id)}
                                        />
                                        <span>{item.nome}</span>
                                    </label>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">Nenhum item disponível</p>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>

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
                        <div>
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" {...register("nome")} />
                            {errors.nome && (
                                <p className="text-sm text-red-500">{errors.nome.message}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="submit">
                                {isEditing ? "Salvar alterações" : "Cadastrar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
