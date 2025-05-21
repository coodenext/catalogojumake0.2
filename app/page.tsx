"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Instagram } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductDetail } from "@/components/product-detail"
import { Banner } from "@/components/banner"
import { products } from "@/data/products"

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Filtrar produtos quando a categoria ou termo de busca mudar
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Filtrar por categoria
      if (activeCategory !== "todos" && product.categoria !== activeCategory) {
        return false
      }

      // Filtrar por termo de busca
      if (searchTerm) {
        const normalizedSearch = searchTerm
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
        const normalizedName = product.nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
        return normalizedName.includes(normalizedSearch)
      }

      return true
    })

    setFilteredProducts(filtered)
  }, [searchTerm, activeCategory])

  // Abrir detalhes do produto
  const openProductDetail = (product) => {
    setSelectedProduct(product)
  }

  // Fechar detalhes do produto
  const closeProductDetail = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-[#fff5f8]">
      {/* Header */}
      <header className="bg-[#ffe2ec] p-5 text-center shadow-md relative">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="JU MAKE"
          width={200}
          height={100}
          className="mx-auto mb-[-45px] object-contain"
        />
        <h1 className="text-[#d6336c] text-2xl font-bold pt-[45px]">CATÁLOGO DE PRODUTOS</h1>
        <a
          href="/admin"
          className="absolute top-5 right-5 w-10 h-10 bg-[#d6336c] text-white rounded-full flex items-center justify-center transition-all hover:bg-[#b52b5c] hover:rotate-12"
          title="Acessar Painel de Administração"
        >
          <span className="sr-only">Admin</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </a>
      </header>

      {/* Banner rotativo */}
      <Banner />

      {/* Busca */}
      <div className="flex justify-center mx-auto mb-4 max-w-[600px] px-5">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full py-3 px-4 border border-gray-200 rounded-full text-base outline-none transition-all focus:border-[#d6336c] focus:shadow-[0_0_0_2px_rgba(214,51,108,0.2)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 justify-center mx-auto mb-5 px-5 max-w-[800px]">
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "todos" ? "bg-[#d6336c] text-white border-[#d6336c]" : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("todos")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "Rosto" ? "bg-[#d6336c] text-white border-[#d6336c]" : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("Rosto")}
        >
          Rosto
        </button>
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "Olhos" ? "bg-[#d6336c] text-white border-[#d6336c]" : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("Olhos")}
        >
          Olhos
        </button>
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "Lábios"
              ? "bg-[#d6336c] text-white border-[#d6336c]"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("Lábios")}
        >
          Lábios
        </button>
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "Skincare"
              ? "bg-[#d6336c] text-white border-[#d6336c]"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("Skincare")}
        >
          Skincare
        </button>
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "Acessórios"
              ? "bg-[#d6336c] text-white border-[#d6336c]"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("Acessórios")}
        >
          Acessórios
        </button>
        <button
          className={`px-4 py-2 bg-white border rounded-full text-sm transition-all ${
            activeCategory === "Kits" ? "bg-[#d6336c] text-white border-[#d6336c]" : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveCategory("Kits")}
        >
          Kits
        </button>
      </div>

      {/* Catálogo de produtos */}
      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-5 max-w-[1200px] mx-auto mb-10 animate-fadeIn">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => openProductDetail(product)} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl text-gray-600 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou termos de busca.</p>
          </div>
        )}
      </main>

      {/* Modal de detalhes do produto */}
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={closeProductDetail} />}

      {/* Footer */}
      <footer className="bg-[#ffe2ec] py-10 px-5 mt-12 relative">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <Image
            src="/placeholder.svg?height=90&width=90"
            alt="JU MAKE"
            width={90}
            height={90}
            className="mb-4 object-contain"
          />
          <div className="mb-4">
            <h2 className="text-xl text-gray-700 mb-2">JU MAKE</h2>
            <p className="text-sm text-gray-600">
              2025 JU MAKE - Todos os direitos reservados.
              <a href="#" className="text-[#d6336c] ml-1 hover:underline">
                Segurança e privacidade
              </a>
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#d6336c] text-white rounded-full flex items-center justify-center transition-all hover:bg-[#b52b5c] hover:-translate-y-1"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#d6336c] text-white rounded-full flex items-center justify-center transition-all hover:bg-[#b52b5c] hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
        <button
          id="btnTopo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-[#d6336c] text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-[#b52b5c] hover:-translate-y-1 ${
            typeof window !== "undefined" && window.scrollY > 300 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          title="Voltar ao topo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          <span className="sr-only">Voltar ao topo</span>
        </button>
      </footer>
    </div>
  )
}
