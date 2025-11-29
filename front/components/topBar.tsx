import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { UsuarioForm } from "@/components/usuario-form";

export function Topbar() {
    const router = useRouter();
    const [usuario, setUsuario] = useState<{ nome: string; id: number } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("usuario");
        if (stored) {
            try {
                setUsuario(JSON.parse(stored));
            } catch (e) {
                console.error("Erro ao ler usuário:", e);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("usuario");
        router.push("/Home");
    };

    const openUserConfig = () => {
        setSelectedId(usuario?.id ?? null);
        setShowModal(true);
    };

    return (
        <>
            <div className="w-full h-16 border-b bg-white flex items-center justify-end px-6 shadow-sm">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer">
                        <div className="text-right">
                            <p className="font-medium">{usuario?.nome ?? "Usuário"}</p>
                            <p className="text-sm text-muted-foreground">Perfil</p>
                        </div>

                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatar.png" alt="User" />
                            <AvatarFallback>{usuario?.nome?.[0] ?? "U"}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-48" align="end">
                        <DropdownMenuItem onClick={openUserConfig}>
                            Configurações do Usuário
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout} className="text-red-600">
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">Configurações do Usuário</h2>

                        <UsuarioForm
                            id={selectedId}
                            onSuccess={() => {
                                setShowModal(false);
                                setSelectedId(null);
                            }}
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 rounded-md border hover:bg-gray-100"
                                onClick={() => setShowModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
