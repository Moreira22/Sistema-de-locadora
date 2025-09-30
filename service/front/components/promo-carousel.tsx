"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const promos = [
  {
    id: 1,
    title: "Promoção de Fim de Semana",
    description: "Alugue 3 filmes e pague apenas 2!",
    image: "/cinema-weekend-promotion-colorful.jpg",
    color: "from-purple-600/20 to-pink-600/20",
  },
  {
    id: 2,
    title: "Novos Lançamentos",
    description: "Confira os filmes mais recentes do cinema",
    image: "/new-movie-releases-popcorn.jpg",
    color: "from-blue-600/20 to-cyan-600/20",
  },
  {
    id: 3,
    title: "Clássicos do Cinema",
    description: "Reviva os grandes sucessos de todos os tempos",
    image: "/classic-cinema-film-reel.jpg",
    color: "from-amber-600/20 to-orange-600/20",
  },
]

export function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promos.length)
  }

  return (
    <div className="relative mb-12 overflow-hidden rounded-xl">
      <div className="relative h-[400px] w-full">
        {promos.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${promo.color}`} />
            <img
              src={promo.image || "/placeholder.svg"}
              alt={promo.title}
              className="h-full w-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background/80 to-transparent p-8 text-center">
              <h2 className="mb-4 text-4xl font-bold text-balance text-foreground">{promo.title}</h2>
              <p className="text-xl text-pretty text-muted-foreground">{promo.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur hover:bg-background/80"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur hover:bg-background/80"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {promos.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
