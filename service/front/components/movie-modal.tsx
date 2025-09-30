"use client"

import { X, Star, Clock, Calendar, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre: string
  duration: string
  description: string
}

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <div className="relative h-[400px] w-full">
          <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 bg-background/50 backdrop-blur hover:bg-background/80"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-balance">{movie.title}</DialogTitle>
            <DialogDescription className="sr-only">Detalhes do filme {movie.title}</DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < movie.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                />
              ))}
              <span className="ml-2 font-semibold text-foreground">{movie.rating}.0</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{movie.year}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{movie.duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>{movie.genre}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Sinopse</h3>
            <p className="leading-relaxed text-muted-foreground text-pretty">{movie.description}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Alugar Agora</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Adicionar à Lista
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
