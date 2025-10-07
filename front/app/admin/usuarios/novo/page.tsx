"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUsuario } from "@/hooks/usuario"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Perfil } from "@/model/perfil"

// --- Schema Zod ---
const usuarioSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(10, "Telefone inválido"),
    cpf: z.string().min(11, "CPF inválido"),
    login: z.string().min(3, "Login deve ter no mínimo 3 caracteres"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    endereco: z.object({
        rua: z.string().optional(),
        bairro: z.string().optional(),
        numero: z.string().optional(),
        cidade: z.string().optional(),
        uf: z.string().optional(),
        cep: z.string().optional(),
    }),
    idPerfil: z.number().min(1, "Selecione um perfil"),
})

type UsuarioFormData = z.infer<typeof usuarioSchema>

interface UsuarioFormPageProps {
    isEdit?: boolean
    usuarioId?: number
}

export default function UsuarioFormPage({ isEdit = false, usuarioId }: UsuarioFormPageProps) {
    const router = useRouter()
    const { postUsuario, putUsuario, getPerfil, getUsuarioById } = useUsuario()
    const [perfil, setPerfil] = useState<Perfil[]>([])

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UsuarioFormData>({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            cpf: "",
            login: "",
            senha: "",
            endereco: {
                rua: "",
                bairro: "",
                numero: "",
                cidade: "",
                uf: "",
                cep: "",
            },
            idPerfil: 0,
        },
    })

    // Carrega perfis
    useEffect(() => {
        const fetchPerfil = async () => {
            const data = await getPerfil()
            setPerfil(data)
        }
        fetchPerfil()
    }, [])

    // Carrega usuário para edição
    useEffect(() => {
        if (!isEdit || !usuarioId) return
        const fetchUsuario = async () => {
            const data = await getUsuarioById(usuarioId)
            if (data) {
                reset({
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                    cpf: data.cpf,
                    login: data.login,
                    senha: data.senha,
                    endereco: {
                        rua: data.endereco?.rua ?? "",
                        bairro: data.endereco?.bairro ?? "",
                        numero: data.endereco?.numero ?? "",
                        cidade: data.endereco?.cidade ?? "",
                        uf: data.endereco?.uf ?? "",
                        cep: data.endereco?.cep ?? "",
                    },
                    idPerfil: data.perfilId ?? 0,
                })
            }
        }
        fetchUsuario()
    }, [isEdit, usuarioId, reset])

    const onSubmit = async (data: UsuarioFormData) => {
        let result
        if (isEdit && usuarioId) {
            result = await putUsuario(data)
        } else {
            result = await postUsuario(data)
        }

        if (result) {
            router.push("/admin/usuarios")
        } else {
            alert("Erro ao salvar usuário")
        }
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/usuarios">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {isEdit ? "Editar Usuário" : "Novo Usuário"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEdit ? "Edite os dados do usuário" : "Cadastre um novo usuário no sistema"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Usuário</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Login e senha */}
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="login"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="login">Login *</Label>
                                        <Input id="login" {...field} />
                                        {errors.login && <p className="text-red-500 text-sm">{errors.login.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="senha"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="senha">Senha *</Label>
                                        <Input id="senha" type="password" {...field} />
                                        {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Nome e Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="nome"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="nome">Nome *</Label>
                                        <Input id="nome" {...field} />
                                        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input id="email" type="email" {...field} />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Telefone e CPF */}
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="telefone"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="telefone">Telefone *</Label>
                                        <Input id="telefone" {...field} />
                                        {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="cpf"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf">CPF *</Label>
                                        <Input id="cpf" {...field} />
                                        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Endereço */}
                        <div className="grid grid-cols-3 gap-4">
                            {["rua","bairro","numero"].map((campo) => (
                                <Controller
                                    key={campo}
                                    name={`endereco.${campo}` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Label>
                                            <Input id={campo} {...field} />
                                        </div>
                                    )}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {["cidade","uf","cep"].map((campo) => (
                                <Controller
                                    key={campo}
                                    name={`endereco.${campo}` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Label>
                                            <Input id={campo} {...field} />
                                        </div>
                                    )}
                                />
                            ))}
                        </div>

                        {/* Perfil */}
                        <Controller
                            name="idPerfil"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="perfil">Perfil *</Label>
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(value) => field.onChange(Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o perfil" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {perfil.map((p) => (
                                                <SelectItem key={p.value} value={p.value.toString()}>
                                                    {p.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.idPerfil && <p className="text-red-500 text-sm">{errors.idPerfil.message}</p>}
                                </div>
                            )}
                        />

                        {/* Botões */}
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : isEdit ? "Atualizar Usuário" : "Cadastrar Usuário"}
                            </Button>
                            <Link href="/admin/usuarios" className="flex-1">
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
