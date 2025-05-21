"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductRating } from "./product-rating"

export function ProductCard({ product, onClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Navegar entre imagens do produto
  const navigateImages = (e, direction) => {
    e.stopPropagation()

    let newIndex = currentImageIndex + direction
    if (newIndex < 0) newIndex = product.imagens.length - 1
    if (newIndex >= product.imagens.length) newIndex = 0

    setCurrentImageIndex(newIndex)
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
        product.estoque <= 0 ? "opacity-80" : ""
      }`}
      onClick={onClick}
    >
      {/* Imagem do produto */}
      <div className="relative h-48 bg-gray-100">
        {product.estoque <= 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded z-10">
            ESGOTADO
          </span>
        )}

        <Image
          src={product.imagens[currentImageIndex] || "/placeholder.svg?height=300&width=300"}
          alt={product.nome}
          width={300}
          height={300}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            product.estoque <= 0 ? "filter grayscale-[70%]" : "hover:scale-105"
          }`}
        />

        {product.imagens.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity">
            <button
              className="ml-2 w-8 h-8 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
              onClick={(e) => navigateImages(e, -1)}
            >
              <ChevronLeft size={18} />
              <span className="sr-only">Imagem anterior</span>
            </button>
            <button
              className="mr-2 w-8 h-8 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
              onClick={(e) => navigateImages(e, 1)}
            >
              <ChevronRight size={18} />
              <span className="sr-only">Próxima imagem</span>
            </button>
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-center text-gray-800 mb-2 min-h-[40px]" title={product.nome}>
          {product.nome}
        </h3>

        <ProductRating productId={product.id} initialRating={product.avaliacao || 0} />

        <div className="text-lg font-bold text-[#d6336c] my-2">R$ {product.preco.toFixed(2)}</div>

        <div className="text-xs text-gray-500 mb-3">
          {product.estoque > 0 ? `${product.estoque} em estoque` : "Indisponível"}
        </div>

        <a
          href={
            product.estoque > 0
              ? `https://wa.me/5500000000000?text=${encodeURIComponent(`Olá, tenho interesse neste produto!\n\nNome: ${product.nome}\nValor: R$ ${product.preco.toFixed(2)}`)}`
              : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-2 text-center text-white font-semibold rounded transition-colors ${
            product.estoque > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => {
            e.stopPropagation()
            if (product.estoque <= 0) e.preventDefault()
          }}
        >
          {product.estoque > 0 ? "Comprar" : "Indisponível"}
        </a>
      </div>
    </div>
  )
}
