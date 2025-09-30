"use client"

import { useState } from "react"
import { Film, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MovieHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-balance">LocaCine</h1>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          ) : (
            <Button
              onClick={() => setIsLoggedIn(true)}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
