"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Banners padrão
const defaultBanners = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=1200",
    title: "Promoção de Maquiagem",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=1200",
    title: "Novos Produtos",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=1200",
    title: "Kits Especiais",
  },
]

export function Banner() {
  const [banners, setBanners] = useState(defaultBanners)
  const [currentBanner, setCurrentBanner] = useState(0)

  // Carregar banners do localStorage
  useEffect(() => {
    try {
      const storedBanners = localStorage.getItem("admin_banners")
      if (storedBanners) {
        const parsedBanners = JSON.parse(storedBanners)
        if (Array.isArray(parsedBanners) && parsedBanners.length > 0) {
          setBanners(parsedBanners)
        }
      }
    } catch (error) {
      console.error("Erro ao carregar banners:", error)
    }
  }, [])

  // Rotação automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  // Navegar para o banner anterior
  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  // Navegar para o próximo banner
  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  // Ir para um banner específico
  const goToBanner = (index) => {
    setCurrentBanner(index)
  }

  return (
    <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden mb-6">
      {/* Banners */}
      <div className="w-full h-full relative">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-800 ${
              index === currentBanner ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.title || `Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Controles */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors z-10"
        onClick={prevBanner}
      >
        <ChevronLeft size={24} />
        <span className="sr-only">Banner anterior</span>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors z-10"
        onClick={nextBanner}
      >
        <ChevronRight size={24} />
        <span className="sr-only">Próximo banner</span>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentBanner ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToBanner(index)}
          >
            <span className="sr-only">Banner {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
