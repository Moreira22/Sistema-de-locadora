"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Film, Users, Home, LayoutDashboard } from "lucide-react"

const menuItems = [
    {
        title: "Início",
        href: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Usuários",
        href: "/admin/usuarios",
        icon: Users,
    },
    {
        title: "Filmes",
        href: "/admin/filmes",
        icon: Film,
    },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r bg-card min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary">LocaCine</h2>
                <p className="text-sm text-muted-foreground">Painel Administrativo</p>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
