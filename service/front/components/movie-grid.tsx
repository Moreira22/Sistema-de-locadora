"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MovieModal } from "@/components/movie-modal"

const movies = [
  {
    id: 1,
    title: "A Origem",
    rating: 5,
    image: "/inception-movie-poster.png",
    year: 2010,
    genre: "Ficção Científica",
    duration: "148 min",
    description:
      "Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.",
  },
  {
    id: 2,
    title: "O Poderoso Chefão",
    rating: 5,
    image: "/classic-mob-poster.png",
    year: 1972,
    genre: "Drama",
    duration: "175 min",
    description:
      "O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
  },
  {
    id: 3,
    title: "Interestelar",
    rating: 5,
    image: "/interstellar-movie-poster.jpg",
    year: 2014,
    genre: "Ficção Científica",
    duration: "169 min",
    description:
      "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.",
  },
  {
    id: 4,
    title: "Parasita",
    rating: 5,
    image: "/parasite-movie-poster.png",
    year: 2019,
    genre: "Thriller",
    duration: "132 min",
    description:
      "Ganância e discriminação de classes ameaçam a relação simbiótica recém-formada entre a família rica Park e o clã pobre Kim.",
  },
  {
    id: 5,
    title: "Coringa",
    rating: 4,
    image: "/generic-clown-poster.png",
    year: 2019,
    genre: "Drama",
    duration: "122 min",
    description:
      "Em Gotham City, Arthur Fleck, um comediante fracassado, é levado à loucura e se torna um assassino psicopata.",
  },
  {
    id: 6,
    title: "Vingadores: Ultimato",
    rating: 5,
    image: "/avengers-endgame-poster.jpg",
    year: 2019,
    genre: "Ação",
    duration: "181 min",
    description:
      "Após os eventos devastadores de Vingadores: Guerra Infinita, os heróis restantes se reúnem mais uma vez para reverter as ações de Thanos.",
  },
  {
    id: 7,
    title: "Pantera Negra",
    rating: 4,
    image: "/black-panther-poster.png",
    year: 2018,
    genre: "Ação",
    duration: "134 min",
    description:
      "T'Challa retorna para casa para a nação isolada e tecnologicamente avançada de Wakanda para servir como seu novo líder.",
  },
  {
    id: 8,
    title: "Duna",
    rating: 5,
    image: "/dune-inspired-poster.png",
    year: 2021,
    genre: "Ficção Científica",
    duration: "155 min",
    description:
      "Paul Atreides, um jovem brilhante e talentoso, deve viajar para o planeta mais perigoso do universo para garantir o futuro de sua família.",
  },
  {
    id: 9,
    title: "Matrix",
    rating: 5,
    image: "/matrix-movie-poster.png",
    year: 1999,
    genre: "Ficção Científica",
    duration: "136 min",
    description:
      "Um hacker descobre que a realidade como ele a conhece é uma simulação criada por máquinas, e se junta a uma rebelião.",
  },
  {
    id: 10,
    title: "Gladiador",
    rating: 5,
    image: "/gladiator-movie-poster.jpg",
    year: 2000,
    genre: "Ação",
    duration: "155 min",
    description:
      "Um ex-general romano busca vingança contra o imperador corrupto que assassinou sua família e o enviou à escravidão.",
  },
  {
    id: 11,
    title: "Pulp Fiction",
    rating: 5,
    image: "/pulp-fiction-poster.png",
    year: 1994,
    genre: "Crime",
    duration: "154 min",
    description:
      "As vidas de dois assassinos da máfia, um boxeador, um gângster e sua esposa se entrelaçam em quatro histórias de violência e redenção.",
  },
  {
    id: 12,
    title: "O Cavaleiro das Trevas",
    rating: 5,
    image: "/dark-knight-poster.png",
    year: 2008,
    genre: "Ação",
    duration: "152 min",
    description:
      "Quando a ameaça conhecida como Coringa causa estragos e caos nas pessoas de Gotham, Batman deve aceitar um dos maiores testes psicológicos.",
  },
]

export function MovieGrid() {
  const [selectedMovie, setSelectedMovie] = useState<(typeof movies)[0] | null>(null)

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-balance">Catálogo de Filmes</h2>
        <p className="text-muted-foreground text-pretty">
          Explore nossa coleção completa de filmes disponíveis para locação
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            className="group cursor-pointer overflow-hidden border-border/50 bg-card transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
            onClick={() => setSelectedMovie(movie)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-3">
                <h3 className="mb-2 line-clamp-2 font-semibold text-balance leading-relaxed">{movie.title}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < movie.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  )
}
