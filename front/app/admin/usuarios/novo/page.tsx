"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useUsuario } from "@/hooks/usuario"
import { useForm } from "react-hook-form"
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

const usuarioSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(10, "Telefone inválido"),
    cpf: z.string().min(11, "CPF inválido"),
    login: z.string().min(3, "Login deve ter no mínimo 3 caracteres"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    endereco: z.object({
        rua: z.string().optional(),
        cidade: z.string().optional(),
        cep: z.string().optional(),
        bairro: z.string().optional(),
        UF: z.string().optional(),
        numero: z.number().optional(), // opcional
    }),
    idPerfil: z.number().min(1, "Selecione um perfil"),
})

type UsuarioFormData = z.infer<typeof usuarioSchema>

export default function UsuarioFormPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const usuarioId = searchParams.get("id")
    const { postUsuario, putUsuario, getPerfil, getUsuarioById } = useUsuario()
    const [perfil, setPerfil] = useState<Perfil[]>([])
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<UsuarioFormData>({
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
                cidade: "",
                cep: "",
                bairro: "",
                UF: "",
                numero: undefined, // undefined agora é compatível
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
        if (!usuarioId) return
        const fetchUsuario = async () => {
            const data = await getUsuarioById(Number(usuarioId))
            if (data) {
                reset({
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                    cpf: data.cpf,
                    login: data.login,
                    senha: "", // senha não é preenchida por segurança
                    endereco: {
                        rua: data.endereco?.rua ?? "",
                        cidade: data.endereco?.cidade ?? "",
                        cep: data.endereco?.cep ?? "",
                        bairro: data.endereco?.bairro ?? "",
                        UF: data.endereco?.UF ?? "",
                        numero: data.endereco?.numero ?? undefined,
                    },
                    idPerfil: data.idPerfil ?? 0,
                })
            }
        }
        fetchUsuario()
    }, [usuarioId, reset])

    const onSubmit = async (data: UsuarioFormData) => {
        let result
        if (usuarioId) {
            result = await putUsuario(Number(usuarioId), data)
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
                        {usuarioId ? "Editar Usuário" : "Novo Usuário"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {usuarioId ? "Edite os dados do usuário" : "Cadastre um novo usuário no sistema"}
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
                            <div className="space-y-2">
                                <Label htmlFor="login">Login *</Label>
                                <Input id="login" {...register("login")} />
                                {errors.login && <p className="text-red-500 text-sm">{errors.login.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="senha">Senha *</Label>
                                <Input id="senha" type="email" {...register("senha")} />
                                {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}
                            </div>
                        </div>

                        {/* Nome e Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome *</Label>
                                <Input id="nome" {...register("nome")} />
                                {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Telefone e CPF */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="telefone">Telefone *</Label>
                                <Input id="telefone" placeholder="(11) 98765-4321" {...register("telefone")} />
                                {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cpf">CPF *</Label>
                                <Input id="cpf" placeholder="000.000.000-00" {...register("cpf")} />
                                {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="space-y-2">
                            <Label htmlFor="rua">Rua</Label>
                            <Input id="rua" {...register("endereco.rua")} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bairro">Bairro *</Label>
                                <Input id="bairro"  {...register("telefone")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="numero">Numero *</Label>
                                <Input id="numero" {...register("cpf")} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cidade">Cidade</Label>
                                <Input id="cidade" {...register("endereco.cidade")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="UF">Estado</Label>
                                <Input id="UF" {...register("endereco.UF")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cep">CEP</Label>
                                <Input id="cep" {...register("endereco.cep")} />
                            </div>
                        </div>

                        {/* Perfil */}
                        <div className="space-y-2">
                            <Label htmlFor="perfil">Perfil *</Label>
                            <Select onValueChange={(value) => setValue("idPerfil", Number(value))}>
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

                        {/* Botões */}
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : usuarioId ? "Atualizar Usuário" : "Cadastrar Usuário"}
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
