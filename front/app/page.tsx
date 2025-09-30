import { MovieHeader } from "@/components/movie-header"
import { PromoCarousel } from "@/components/promo-carousel"
import { MovieGrid } from "@/components/movie-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MovieHeader />
      <main className="container mx-auto px-4 py-8">
        <PromoCarousel />
        <MovieGrid />
      </main>
    </div>
  )
}
