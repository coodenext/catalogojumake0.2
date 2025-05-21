"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

export function ProductRating({ productId, initialRating = 0, size = "md" }) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  // Carregar avaliação do localStorage
  useEffect(() => {
    try {
      const ratings = JSON.parse(localStorage.getItem("product_ratings") || "{}")
      if (ratings[productId]) {
        setRating(ratings[productId])
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error)
    }
  }, [productId])

  // Salvar avaliação no localStorage
  const saveRating = (value) => {
    try {
      const ratings = JSON.parse(localStorage.getItem("product_ratings") || "{}")
      ratings[productId] = value
      localStorage.setItem("product_ratings", JSON.stringify(ratings))
      setRating(value)
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error)
    }
  }

  // Tamanho das estrelas
  const starSize = size === "lg" ? 24 : 16

  return (
    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => saveRating(star)}
        >
          <Star
            size={starSize}
            className={`${
              star <= (hover || rating) ? "fill-[#FFD700] text-[#FFD700]" : "fill-gray-200 text-gray-200"
            } transition-colors`}
          />
          <span className="sr-only">{star} estrelas</span>
        </button>
      ))}
    </div>
  )
}
