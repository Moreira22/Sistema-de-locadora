"use client"

import { useState } from "react"
import { Film, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {Auth} from "@/model/auth";
import {useAuth} from "@/hooks/auth";

export function MovieHeader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const {postAuthUser} = useAuth();

    const handleLogin = async () => {
        try {
            const userAuth: Auth = {
                username: username,
                password: password,
            };

            const data = await postAuthUser(userAuth);

            if (data && data.usuario) {
                setIsLoggedIn(true);
                setShowModal(false);
                router.push("/admin");
            } else {
                // Se login falhou
                alert("Usuário ou senha inválidos!");
            }
        } catch (error) {
            console.error("Erro ao autenticar:", error);
            alert("Ocorreu um erro ao tentar fazer login.");
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <Film className="h-8 w-8 text-primary" />
                        <h1 className="text-2xl font-bold text-balance">LocaCine</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <Button
                                variant="outline"
                                onClick={() => setIsLoggedIn(false)}
                                className="gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sair
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setShowModal(true)}
                                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <LogIn className="h-4 w-4" />
                                Entrar
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-bold">Login</h2>
                        <Input
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-3"
                        />
                        <Input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleLogin}>Entrar</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
