"use client"

import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUsuario } from "@/hooks/usuario"
import { useEffect, useState } from "react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Perfil } from "@/model/perfil"
import { UF } from "@/lib/enums/uf"

const usuarioSchema = z.object({
    usuario: z.object({
        nome: z.string().min(3),
        email: z.string().email(),
        telefone: z.string().min(10),
        cpf: z.string().min(11),
        login: z.string().min(3),
        senha: z.string().min(6),
        idPerfil: z.number().min(1),
    }),
    endereco: z.object({
        rua: z.string().optional(),
        bairro: z.string().optional(),
        numero: z.string().optional(),
        cidade: z.string().optional(),
        uf: z.string().optional(),
        cep: z.string().optional(),
    }),
})

type UsuarioFormData = z.infer<typeof usuarioSchema>

interface UsuarioFormProps {
    id?: number | null
    onSuccess?: () => void
}

export function UsuarioForm({ id, onSuccess }: UsuarioFormProps) {
    const router = useRouter()
    const { postUsuario, putUsuario, getPerfil, getUsuarioById } = useUsuario()

    const [perfil, setPerfil] = useState<Perfil[]>([])
    const isEdit = !!id

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UsuarioFormData>({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            usuario: {
                nome: "",
                email: "",
                telefone: "",
                cpf: "",
                login: "",
                senha: "",
                idPerfil: 0,
            },
            endereco: {
                rua: "",
                bairro: "",
                numero: "",
                cidade: "",
                uf: "",
                cep: "",
            },
        },
    })

    // Carrega perfis
    useEffect(() => {
        getPerfil().then(setPerfil)
    }, [])

    // Se for edição, carrega dados do usuário
    useEffect(() => {
        if (!id) return

        const load = async () => {
            const data = await getUsuarioById(id)
            if (data) {
                reset({
                    usuario: {
                        nome: data.nome,
                        email: data.email,
                        telefone: data.telefone,
                        cpf: data.cpf,
                        login: data.login,
                        senha: data.senha,
                        idPerfil: data.perfilId ?? 0,
                    },
                    endereco: {
                        rua: data.endereco?.rua ?? "",
                        bairro: data.endereco?.bairro ?? "",
                        numero: data.endereco?.numero ?? "",
                        cidade: data.endereco?.cidade ?? "",
                        uf: data.endereco?.uf ?? "",
                        cep: data.endereco?.cep ?? "",
                    },
                })
            }
        }

        load()
    }, [id, reset])

    const onSubmit = async (data: UsuarioFormData) => {
        const result = isEdit ? await putUsuario(data) : await postUsuario(data)

        if (result) {
            onSuccess?.()
            router.refresh()
        } else {
            alert("Erro ao salvar usuário")
        }
    }

    const ufOptions = Object.values(UF).map((uf) => ({ value: uf, label: uf }))

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>{isEdit ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Login e Senha */}
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="usuario.login"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>Login *</Label>
                                    <Input {...field} />
                                    {errors.usuario?.login && (
                                        <p className="text-red-500 text-sm">{errors.usuario.login.message}</p>
                                    )}
                                </div>
                            )}
                        />
                        <Controller
                            name="usuario.senha"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>Senha *</Label>
                                    <Input type="password" {...field} />
                                    {errors.usuario?.senha && (
                                        <p className="text-red-500 text-sm">{errors.usuario.senha.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {/* Nome / Email */}
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="usuario.nome"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>Nome *</Label>
                                    <Input {...field} />
                                </div>
                            )}
                        />

                        <Controller
                            name="usuario.email"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>Email *</Label>
                                    <Input type="email" {...field} />
                                </div>
                            )}
                        />
                    </div>

                    {/* Telefone / CPF */}
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="usuario.telefone"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>Telefone *</Label>
                                    <Input {...field} />
                                </div>
                            )}
                        />

                        <Controller
                            name="usuario.cpf"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>CPF *</Label>
                                    <Input {...field} />
                                </div>
                            )}
                        />
                    </div>

                    {/* Endereço */}
                    <div className="grid grid-cols-3 gap-4">
                        {["rua", "bairro", "numero"].map((campo) => (
                            <Controller
                                key={campo}
                                name={`endereco.${campo}` as const}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Label>{campo.toUpperCase()}</Label>
                                        <Input {...field} />
                                    </div>
                                )}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {["cidade", "cep"].map((campo) => (
                            <Controller
                                key={campo}
                                name={`endereco.${campo}` as const}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Label>{campo.toUpperCase()}</Label>
                                        <Input {...field} />
                                    </div>
                                )}
                            />
                        ))}

                        <Controller
                            name="endereco.uf"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label>UF</Label>
                                    <Select value={field.value || ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ufOptions.map((uf) => (
                                                <SelectItem key={uf.value} value={uf.value}>
                                                    {uf.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        />
                    </div>

                    {/* Perfil */}
                    {/*<Controller*/}
                    {/*    name="usuario.idPerfil"*/}
                    {/*    control={control}*/}
                    {/*    render={({ field }) => (*/}
                    {/*        <div>*/}
                    {/*            <Label>Perfil *</Label>*/}
                    {/*            <Select*/}
                    {/*                value={field.value?.toString()}*/}
                    {/*                onValueChange={(value) => field.onChange(Number(value))}*/}
                    {/*            >*/}
                    {/*                <SelectTrigger>*/}
                    {/*                    <SelectValue placeholder="Selecione" />*/}
                    {/*                </SelectTrigger>*/}
                    {/*                <SelectContent>*/}
                    {/*                    {perfil.map((p) => (*/}
                    {/*                        <SelectItem key={p.value} value={p.value.toString()}>*/}
                    {/*                            {p.label}*/}
                    {/*                        </SelectItem>*/}
                    {/*                    ))}*/}
                    {/*                </SelectContent>*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*/>*/}

                    {/* Botão */}
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Salvando..." : isEdit ? "Atualizar" : "Cadastrar"}
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}
