"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { ProductRating } from "./product-rating"

export function ProductDetail({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-[90%] max-w-4xl mx-auto my-10 rounded-xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>
          <X size={24} />
          <span className="sr-only">Fechar</span>
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Imagens */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 h-[300px] md:h-[400px]">
              <Image
                src={product.imagens[currentImageIndex] || "/placeholder.svg?height=500&width=500"}
                alt={product.nome}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            {product.imagens.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.imagens.map((src, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      index === currentImageIndex ? "border-[#d6336c]" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={src || "/placeholder.svg?height=60&width=60"}
                      alt={`${product.nome} - Imagem ${index + 1}`}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.nome}</h2>

            <ProductRating productId={product.id} initialRating={product.avaliacao || 0} size="lg" />

            <div className="text-3xl font-bold text-[#d6336c] my-4">R$ {product.preco.toFixed(2)}</div>

            <div
              className={`text-sm mb-6 ${
                product.estoque <= 0 ? "text-red-600" : product.estoque <= 2 ? "text-amber-600" : "text-gray-600"
              }`}
            >
              {product.estoque > 0 ? `${product.estoque} em estoque` : "Indisponível"}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Descrição:</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.descricao ||
                  "Com acabamento aveludado e alta fixação, este produto entrega cor intensa, conforto e estilo. Cores sortidas para combinar com todos os momentos."}
              </p>
            </div>

            <a
              href={
                product.estoque > 0
                  ? `https://wa.me/5500000000000?text=${encodeURIComponent(`Olá, tenho interesse neste produto!\n\nNome: ${product.nome}\nValor: R$ ${product.preco.toFixed(2)}`)}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 text-center text-white font-semibold rounded-lg transition-colors flex items-center justify-center ${
                product.estoque > 0 ? "bg-[#25D366] hover:bg-[#1ebe5d]" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (product.estoque <= 0) e.preventDefault()
              }}
            >
              {product.estoque > 0 ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Comprar pelo WhatsApp
                </>
              ) : (
                "Indisponível"
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
