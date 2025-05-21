"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2, Plus, Save, ArrowLeft, Edit } from "lucide-react"
import { products as defaultProducts } from "@/data/products"

export default function AdminPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [banners, setBanners] = useState([])
  const [activeTab, setActiveTab] = useState("produtos")
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingBanner, setEditingBanner] = useState(null)

  // Carregar dados do localStorage
  useEffect(() => {
    try {
      // Carregar produtos
      const storedProducts = localStorage.getItem("admin_produtos")
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts))
      } else {
        setProducts(defaultProducts)
        localStorage.setItem("admin_produtos", JSON.stringify(defaultProducts))
      }

      // Carregar banners
      const storedBanners = localStorage.getItem("admin_banners")
      if (storedBanners) {
        setBanners(JSON.parse(storedBanners))
      } else {
        const defaultBanners = [
          { id: 1, titulo: "Banner Principal", imagem: "/placeholder.svg?height=400&width=1200" },
          { id: 2, titulo: "Promoções", imagem: "/placeholder.svg?height=400&width=1200" },
          { id: 3, titulo: "Novidades", imagem: "/placeholder.svg?height=400&width=1200" },
        ]
        setBanners(defaultBanners)
        localStorage.setItem("admin_banners", JSON.stringify(defaultBanners))
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }
  }, [])

  // Salvar produtos no localStorage
  const saveProducts = (updatedProducts) => {
    try {
      localStorage.setItem("admin_produtos", JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
    } catch (error) {
      console.error("Erro ao salvar produtos:", error)
    }
  }

  // Salvar banners no localStorage
  const saveBanners = (updatedBanners) => {
    try {
      localStorage.setItem("admin_banners", JSON.stringify(updatedBanners))
      setBanners(updatedBanners)
    } catch (error) {
      console.error("Erro ao salvar banners:", error)
    }
  }

  // Adicionar novo produto
  const addNewProduct = () => {
    const newProduct = {
      id: Date.now(),
      nome: "Novo Produto",
      preco: 0,
      imagens: ["/placeholder.svg?height=300&width=300"],
      estoque: 0,
      categoria: "Rosto",
      descricao: "Descrição do produto",
    }

    setEditingProduct(newProduct)
  }

  // Adicionar novo banner
  const addNewBanner = () => {
    const newBanner = {
      id: Date.now(),
      titulo: "Novo Banner",
      imagem: "/placeholder.svg?height=400&width=1200",
    }

    setEditingBanner(newBanner)
  }

  // Salvar produto
  const saveProduct = () => {
    if (!editingProduct) return

    const isNew = !products.some((p) => p.id === editingProduct.id)
    let updatedProducts

    if (isNew) {
      updatedProducts = [...products, editingProduct]
    } else {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    }

    saveProducts(updatedProducts)
    setEditingProduct(null)
  }

  // Salvar banner
  const saveBanner = () => {
    if (!editingBanner) return

    const isNew = !banners.some((b) => b.id === editingBanner.id)
    let updatedBanners

    if (isNew) {
      updatedBanners = [...banners, editingBanner]
    } else {
      updatedBanners = banners.map((b) => (b.id === editingBanner.id ? editingBanner : b))
    }

    saveBanners(updatedBanners)
    setEditingBanner(null)
  }

  // Excluir produto
  const deleteProduct = (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      const updatedProducts = products.filter((p) => p.id !== id)
      saveProducts(updatedProducts)
    }
  }

  // Excluir banner
  const deleteBanner = (id) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      const updatedBanners = banners.filter((b) => b.id !== id)
      saveBanners(updatedBanners)
    }
  }

  // Editar produto
  const editProduct = (product) => {
    setEditingProduct({ ...product })
  }

  // Editar banner
  const editBanner = (banner) => {
    setEditingBanner({ ...banner })
  }

  // Atualizar campo do produto
  const updateProductField = (field, value) => {
    setEditingProduct((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Atualizar campo do banner
  const updateBannerField = (field, value) => {
    setEditingBanner((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Adicionar imagem ao produto
  const addProductImage = () => {
    if (!editingProduct) return

    setEditingProduct((prev) => ({
      ...prev,
      imagens: [...prev.imagens, "/placeholder.svg?height=300&width=300"],
    }))
  }

  // Remover imagem do produto
  const removeProductImage = (index) => {
    if (!editingProduct) return

    setEditingProduct((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index),
    }))
  }

  // Atualizar imagem do produto
  const updateProductImage = (index, url) => {
    if (!editingProduct) return

    setEditingProduct((prev) => {
      const newImages = [...prev.imagens]
      newImages[index] = url
      return {
        ...prev,
        imagens: newImages,
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#d6336c] text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 bg-white text-[#d6336c] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => router.push("/")}
            >
              <ArrowLeft size={18} />
              Voltar ao site
            </button>
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => (activeTab === "produtos" ? saveProduct() : saveBanner())}
              disabled={!editingProduct && !editingBanner}
            >
              <Save size={18} />
              Salvar
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex">
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "produtos"
                ? "text-[#d6336c] border-b-2 border-[#d6336c]"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => {
              setActiveTab("produtos")
              setEditingProduct(null)
              setEditingBanner(null)
            }}
          >
            Produtos
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "banners"
                ? "text-[#d6336c] border-b-2 border-[#d6336c]"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => {
              setActiveTab("banners")
              setEditingProduct(null)
              setEditingBanner(null)
            }}
          >
            Banners
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Produtos */}
        {activeTab === "produtos" && !editingProduct && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gerenciar Produtos</h2>
              <button
                className="flex items-center gap-2 bg-[#d6336c] text-white px-4 py-2 rounded-md hover:bg-[#b52b5c] transition-colors"
                onClick={addNewProduct}
              >
                <Plus size={18} />
                Novo Produto
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Imagem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estoque
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                          <Image
                            src={product.imagens[0] || "/placeholder.svg?height=48&width=48"}
                            alt={product.nome}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.nome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">R$ {product.preco.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm ${
                            product.estoque <= 0
                              ? "text-red-600"
                              : product.estoque <= 5
                                ? "text-amber-600"
                                : "text-green-600"
                          }`}
                        >
                          {product.estoque}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.categoria}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => editProduct(product)}
                          >
                            <Edit size={18} />
                            <span className="sr-only">Editar</span>
                          </button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => deleteProduct(product.id)}>
                            <Trash2 size={18} />
                            <span className="sr-only">Excluir</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edição de Produto */}
        {activeTab === "produtos" && editingProduct && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingProduct.id && products.some((p) => p.id === editingProduct.id)
                  ? "Editar Produto"
                  : "Novo Produto"}
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      value={editingProduct.nome}
                      onChange={(e) => updateProductField("nome", e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      value={editingProduct.preco}
                      onChange={(e) => updateProductField("preco", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      value={editingProduct.estoque}
                      onChange={(e) => updateProductField("estoque", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      value={editingProduct.categoria}
                      onChange={(e) => updateProductField("categoria", e.target.value)}
                    >
                      <option value="Rosto">Rosto</option>
                      <option value="Olhos">Olhos</option>
                      <option value="Lábios">Lábios</option>
                      <option value="Skincare">Skincare</option>
                      <option value="Acessórios">Acessórios</option>
                      <option value="Kits">Kits</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      rows={4}
                      value={editingProduct.descricao}
                      onChange={(e) => updateProductField("descricao", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Imagens do Produto</label>
                      <button className="text-sm text-[#d6336c] hover:text-[#b52b5c]" onClick={addProductImage}>
                        + Adicionar Imagem
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {editingProduct.imagens.map((imagem, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border">
                            <Image
                              src={imagem || "/placeholder.svg"}
                              alt={`Imagem ${index + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="absolute top-2 right-2 flex gap-1">
                            <button
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
                              onClick={() => {
                                const url = prompt("URL da imagem:", imagem)
                                if (url) updateProductImage(index, url)
                              }}
                            >
                              <Edit size={14} />
                              <span className="sr-only">Editar URL</span>
                            </button>

                            <button
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
                              onClick={() => removeProductImage(index)}
                            >
                              <Trash2 size={14} />
                              <span className="sr-only">Remover</span>
                            </button>
                          </div>

                          <div className="mt-1">
                            <input
                              type="text"
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              value={imagem}
                              onChange={(e) => updateProductImage(index, e.target.value)}
                              placeholder="URL da imagem"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-[#d6336c] text-white rounded-md hover:bg-[#b52b5c] transition-colors"
                  onClick={saveProduct}
                >
                  Salvar Produto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Banners */}
        {activeTab === "banners" && !editingBanner && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gerenciar Banners</h2>
              <button
                className="flex items-center gap-2 bg-[#d6336c] text-white px-4 py-2 rounded-md hover:bg-[#b52b5c] transition-colors"
                onClick={addNewBanner}
              >
                <Plus size={18} />
                Novo Banner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={banner.imagem || "/placeholder.svg"}
                      alt={banner.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{banner.titulo}</h3>

                    <div className="flex justify-between">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                        onClick={() => editBanner(banner)}
                      >
                        <Edit size={16} />
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        onClick={() => deleteBanner(banner.id)}
                      >
                        <Trash2 size={16} />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edição de Banner */}
        {activeTab === "banners" && editingBanner && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingBanner.id && banners.some((b) => b.id === editingBanner.id) ? "Editar Banner" : "Novo Banner"}
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título do Banner</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      value={editingBanner.titulo}
                      onChange={(e) => updateBannerField("titulo", e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent"
                      value={editingBanner.imagem}
                      onChange={(e) => updateBannerField("imagem", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="aspect-[16/9] relative rounded-md overflow-hidden bg-gray-100 border">
                    <Image
                      src={editingBanner.imagem || "/placeholder.svg"}
                      alt={editingBanner.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setEditingBanner(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-[#d6336c] text-white rounded-md hover:bg-[#b52b5c] transition-colors"
                  onClick={saveBanner}
                >
                  Salvar Banner
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
