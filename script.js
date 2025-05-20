// Dados dos produtos (agora carregados do localStorage se disponível)
let produtos = [
  {
    id: 1,
    nome: "KIT Primer Facial – Phállebeaut / Esponja Chanfrada / 4 Angels Corretivo Líquido",
    preco: 41.90,
    imagens: ["imagens/2 (1).jpg"],
    estoque: 3,
    categoria: "Kits"
  },
  // ... outros produtos (mantidos como fallback)
];

// Variáveis globais
const catalogo = document.getElementById("catalogo");
let slideIndex = 0;
let produtosFiltrados = [];
let categoriaAtual = "todos";
let termoBusca = "";
let lightboxProdutoAtual = null;
let lightboxImagemAtual = 0;

// Função para carregar dados do localStorage
function carregarDadosDoLocalStorage() {
  try {
    // Carregar produtos
    const produtosArmazenados = localStorage.getItem('admin_produtos');
    if (produtosArmazenados) {
      produtos = JSON.parse(produtosArmazenados);
      console.log('Produtos carregados do localStorage:', produtos.length);
    }
    
    // Carregar banners (para uso futuro)
    const bannersArmazenados = localStorage.getItem('admin_banners');
    if (bannersArmazenados) {
      atualizarBannersDoSite(JSON.parse(bannersArmazenados));
      console.log('Banners carregados do localStorage');
    }
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error);
  }
}

// Função para atualizar banners do site
function atualizarBannersDoSite(banners) {
  if (!banners || !Array.isArray(banners) || banners.length === 0) return;
  
  // Obter o container de slides
  const bannerSlides = document.querySelector('.banner-slides');
  if (!bannerSlides) return;
  
  // Obter o container de dots
  const dotsContainer = document.querySelector('.dots-container');
  if (!dotsContainer) return;
  
  // Limpar slides e dots existentes
  bannerSlides.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  // Adicionar novos slides e dots
  banners.forEach((banner, index) => {
    // Criar slide
    const slide = document.createElement('div');
    slide.className = `banner-slide ${index === 0 ? 'active' : ''}`;
    
    const img = document.createElement('img');
    img.src = banner.imagem;
    img.alt = banner.titulo || `Banner ${index + 1}`;
    img.onerror = function() {
      this.src = `https://via.placeholder.com/1200x400?text=Banner+${index + 1}`;
    };
    
    slide.appendChild(img);
    bannerSlides.appendChild(slide);
    
    // Criar dot
    const dot = document.createElement('span');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = function() {
      goToSlide(index);
    };
    
    dotsContainer.appendChild(dot);
  });
  
  // Reiniciar o slideshow
  mostrarSlide(0);
}

// Funções para o banner rotativo
function changeSlide(n) {
  mostrarSlide(slideIndex += n);
}

function goToSlide(n) {
  mostrarSlide(slideIndex = n);
}

function mostrarSlide(n) {
  const slides = document.querySelectorAll(".banner-slide");
  const dots = document.querySelectorAll(".dot");
  
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  
  // Esconder todos os slides
  slides.forEach(slide => {
    slide.classList.remove("active");
  });
  
  // Desativar todos os dots
  dots.forEach(dot => {
    dot.classList.remove("active");
  });
  
  // Mostrar o slide atual
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Rotação automática do banner
function iniciarRotacaoAutomatica() {
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Funções para gerenciar avaliações
function carregarAvaliacoes() {
  try {
    const avaliacoes = localStorage.getItem("avaliacoes");
    return avaliacoes ? JSON.parse(avaliacoes) : {};
  } catch (error) {
    console.error("Erro ao carregar avaliações:", error);
    return {};
  }
}

function salvarAvaliacao(produtoId, nota) {
  try {
    const avaliacoes = carregarAvaliacoes();
    avaliacoes[produtoId] = nota;
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  } catch (error) {
    console.error("Erro ao salvar avaliação:", error);
  }
}

function criarEstrelas(produtoId, container) {
  const avaliacoes = carregarAvaliacoes();
  const notaAtual = avaliacoes[produtoId] || 0;
  
  container.innerHTML = "";
  
  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("span");
    estrela.className = `estrela ${i <= notaAtual ? "ativa" : ""}`;
    estrela.innerHTML = "★";
    estrela.dataset.valor = i;
    estrela.dataset.produtoId = produtoId;
    
    estrela.addEventListener("click", (e) => {
      e.stopPropagation();
      const valor = parseInt(e.target.dataset.valor);
      const id = parseInt(e.target.dataset.produtoId);
      salvarAvaliacao(id, valor);
      
      // Atualizar visualmente
      const estrelas = container.querySelectorAll(".estrela");
      estrelas.forEach((estrela, index) => {
        if (index < valor) {
          estrela.classList.add("ativa");
        } else {
          estrela.classList.remove("ativa");
        }
      });
    });
    
    container.appendChild(estrela);
  }
  
  return container;
}

// Funções para exibir produtos
function criarElementoProduto(produto) {
  const div = document.createElement("div");
  div.className = `produto ${produto.estoque <= 0 ? "esgotado" : ""}`;
  div.dataset.id = produto.id;
  
  // Imagem do produto com controles
  const divImagem = document.createElement("div");
  divImagem.className = "produto-imagem";
  
  // Tag "ESGOTADO" se aplicável
  if (produto.estoque <= 0) {
    const tagEsgotado = document.createElement("span");
    tagEsgotado.className = "tag-esgotado";
    tagEsgotado.textContent = "ESGOTADO";
    divImagem.appendChild(tagEsgotado);
  }
  
  const img = document.createElement("img");
  img.src = produto.imagens[0] || "https://via.placeholder.com/300x300?text=Sem+Imagem";
  img.alt = produto.nome;
  img.onerror = function() {
    this.src = "https://via.placeholder.com/300x300?text=Sem+Imagem";
  };
  divImagem.appendChild(img);
  
  // Controles de imagem (se houver mais de uma)
  if (produto.imagens.length > 1) {
    const divControles = document.createElement("div");
    divControles.className = "controles-imagem";
    
    const btnAnterior = document.createElement("button");
    btnAnterior.className = "controle-btn";
    btnAnterior.innerHTML = "&#10094;";
    btnAnterior.addEventListener("click", (e) => {
      e.stopPropagation();
      navegarImagens(produto, img, -1);
    });
    
    const btnProximo = document.createElement("button");
    btnProximo.className = "controle-btn";
    btnProximo.innerHTML = "&#10095;";
    btnProximo.addEventListener("click", (e) => {
      e.stopPropagation();
      navegarImagens(produto, img, 1);
    });
    
    divControles.appendChild(btnAnterior);
    divControles.appendChild(btnProximo);
    divImagem.appendChild(divControles);
  }
  
  div.appendChild(divImagem);
  
  // Informações do produto
  const divInfo = document.createElement("div");
  divInfo.className = "produto-info";
  
  const nome = document.createElement("h3");
  nome.className = "produto-nome";
  nome.textContent = produto.nome;
  nome.title = produto.nome; // Adiciona tooltip para nomes longos
  divInfo.appendChild(nome);
  
  // Estrelas de avaliação
  const divEstrelas = document.createElement("div");
  divEstrelas.className = "estrelas";
  criarEstrelas(produto.id, divEstrelas);
  divInfo.appendChild(divEstrelas);
  
  const preco = document.createElement("div");
  preco.className = "produto-preco";
  preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
  divInfo.appendChild(preco);
  
  // Estoque
  const estoque = document.createElement("div");
  estoque.className = "produto-estoque";
  estoque.textContent = produto.estoque > 0 ? `${produto.estoque} em estoque` : "Indisponível";
  divInfo.appendChild(estoque);
  
  // Botão de compra
  const botao = document.createElement("a");
  botao.className = `comprar-btn ${produto.estoque <= 0 ? "botao-desativado" : ""}`;
  botao.textContent = produto.estoque <= 0 ? "Indisponível" : "Comprar";
  
  if (produto.estoque <= 0) {
    botao.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
  } else {
    botao.href = `https://wa.me/5587991065384?text=${encodeURIComponent(`Olá, tenho interesse neste produto!\n\nNome: ${produto.nome}\nValor: R$ ${produto.preco.toFixed(2)}`)}`;
    botao.target = "_blank";
    botao.onclick = (e) => {
      e.stopPropagation();
    };
  }
  
  divInfo.appendChild(botao);
  div.appendChild(divInfo);
  
  // Evento de clique para abrir detalhes
  div.addEventListener("click", () => {
    abrirDetalhesProduto(produto);
  });
  
  return div;
}

function navegarImagens(produto, imgElement, direcao) {
  // Encontrar o índice atual da imagem
  const imagemAtual = imgElement.src;
  let indiceAtual = 0;
  
  for (let i = 0; i < produto.imagens.length; i++) {
    if (imagemAtual.includes(produto.imagens[i])) {
      indiceAtual = i;
      break;
    }
  }
  
  // Calcular o próximo índice
  let novoIndice = indiceAtual + direcao;
  if (novoIndice < 0) novoIndice = produto.imagens.length - 1;
  if (novoIndice >= produto.imagens.length) novoIndice = 0;
  
  // Atualizar a imagem
  imgElement.src = produto.imagens[novoIndice] || "https://via.placeholder.com/300x300?text=Sem+Imagem";
}

function carregarProdutos() {
  catalogo.innerHTML = "";
  
  if (produtosFiltrados.length === 0) {
    const mensagem = document.createElement("div");
    mensagem.className = "mensagem-sem-produtos";
    mensagem.innerHTML = `
      <h3>Nenhum produto encontrado</h3>
      <p>Tente ajustar os filtros ou termos de busca.</p>
    `;
    catalogo.appendChild(mensagem);
    return;
  }
  
  produtosFiltrados.forEach(produto => {
    const elementoProduto = criarElementoProduto(produto);
    catalogo.appendChild(elementoProduto);
  });
}

// Funções de filtro
function filtrarProdutos() {
  const termo = document.getElementById("buscarProduto").value.toLowerCase();
  termoBusca = termo;
  
  aplicarFiltros();
}

function filtrarPorCategoria(categoria) {
  categoriaAtual = categoria;
  
  // Atualizar botões de categoria
  document.querySelectorAll(".category-btn").forEach(btn => {
    if (btn.dataset.category === categoria) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  aplicarFiltros();
}

function aplicarFiltros() {
  // Normalizar termo de busca (remover acentos)
  const termoNormalizado = termoBusca.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  produtosFiltrados = produtos.filter(produto => {
    // Filtrar por categoria
    if (categoriaAtual !== "todos" && produto.categoria !== categoriaAtual) {
      return false;
    }
    
    // Filtrar por termo de busca
    if (termoBusca) {
      const nomeNormalizado = produto.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return nomeNormalizado.includes(termoNormalizado);
    }
    
    return true;
  });
  
  carregarProdutos();
}

// Funções para o lightbox
function abrirLightbox(produto, indiceImagem = 0) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  
  lightboxProdutoAtual = produto;
  lightboxImagemAtual = indiceImagem;
  
  lightboxImg.src = produto.imagens[indiceImagem] || "https://via.placeholder.com/800x800?text=Sem+Imagem";
  lightboxImg.alt = produto.nome;
  lightboxImg.onerror = function() {
    this.src = "https://via.placeholder.com/800x800?text=Sem+Imagem";
  };
  
  lightboxCounter.textContent = `${indiceImagem + 1}/${produto.imagens.length}`;
  
  lightbox.style.display = "flex";
  
  // Configurar eventos
  document.querySelector(".close-lightbox").onclick = fecharLightbox;
  document.getElementById("lightbox-prev").onclick = () => mudarImagemLightbox(-1);
  document.getElementById("lightbox-next").onclick = () => mudarImagemLightbox(1);
}

function fecharLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function mudarImagemLightbox(direcao) {
  if (!lightboxProdutoAtual) return;
  
  lightboxImagemAtual += direcao;
  
  if (lightboxImagemAtual < 0) {
    lightboxImagemAtual = lightboxProdutoAtual.imagens.length - 1;
  } else if (lightboxImagemAtual >= lightboxProdutoAtual.imagens.length) {
    lightboxImagemAtual = 0;
  }
  
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  
  lightboxImg.src = lightboxProdutoAtual.imagens[lightboxImagemAtual] || "https://via.placeholder.com/800x800?text=Sem+Imagem";
  lightboxCounter.textContent = `${lightboxImagemAtual + 1}/${lightboxProdutoAtual.imagens.length}`;
}

// Funções para detalhes do produto
function abrirDetalhesProduto(produto) {
  const detalheNome = document.getElementById("detalhe-nome");
  const detalheImgPrincipal = document.getElementById("detalhe-img-principal");
  const detalheMiniaturas = document.getElementById("detalhe-miniaturas");
  const detalheEstrelas = document.getElementById("detalhe-estrelas");
  const detalhePreco = document.getElementById("detalhe-preco");
  const detalheEstoque = document.getElementById("detalhe-estoque");
  const detalheDescricao = document.getElementById("detalhe-descricao");
  const detalheComprar = document.getElementById("detalhe-comprar");
  
  // Preencher informações
  detalheNome.textContent = produto.nome;
  detalheImgPrincipal.src = produto.imagens[0] || "https://via.placeholder.com/500x500?text=Sem+Imagem";
  detalheImgPrincipal.alt = produto.nome;
  detalheImgPrincipal.onerror = function() {
    this.src = "https://via.placeholder.com/500x500?text=Sem+Imagem";
  };
  
  // Limpar e criar miniaturas
  detalheMiniaturas.innerHTML = "";
  if (produto.imagens.length > 1) {
    produto.imagens.forEach((src, index) => {
      const miniatura = document.createElement("div");
      miniatura.className = `detalhe-miniatura ${index === 0 ? "ativa" : ""}`;
      
      const img = document.createElement("img");
      img.src = src || "https://via.placeholder.com/60x60?text=Sem+Imagem";
      img.alt = `${produto.nome} - Imagem ${index + 1}`;
      img.onerror = function() {
        this.src = "https://via.placeholder.com/60x60?text=Sem+Imagem";
      };
      
      miniatura.appendChild(img);
      miniatura.addEventListener("click", () => {
        // Atualizar imagem principal
        detalheImgPrincipal.src = src || "https://via.placeholder.com/500x500?text=Sem+Imagem";
        
        // Atualizar classe ativa
        document.querySelectorAll(".detalhe-miniatura").forEach(m => m.classList.remove("ativa"));
        miniatura.classList.add("ativa");
      });
      
      detalheMiniaturas.appendChild(miniatura);
    });
  }
  
  // Criar estrelas
  criarEstrelas(produto.id, detalheEstrelas);
  
  // Preço e estoque
  detalhePreco.textContent = `R$ ${produto.preco.toFixed(2)}`;
  
  if (produto.estoque <= 0) {
    detalheEstoque.textContent = "Indisponível";
    detalheEstoque.className = "detalhe-estoque sem-estoque";
  } else {
    detalheEstoque.textContent = `${produto.estoque} em estoque`;
    detalheEstoque.className = produto.estoque <= 2 ? "detalhe-estoque estoque-baixo" : "detalhe-estoque";
  }
  
  // Descrição
  detalheDescricao.textContent = produto.descricao || "Sem descrição disponível.";
  
  // Botão de compra
  if (produto.estoque <= 0) {
    detalheComprar.textContent = "Indisponível";
    detalheComprar.className = "botao-whatsapp botao-desativado";
    detalheComprar.removeAttribute("href");
    detalheComprar.onclick = (e) => e.preventDefault();
  } else {
    detalheComprar.innerHTML = '<i class="fab fa-whatsapp"></i> Comprar pelo WhatsApp';
    detalheComprar.className = "botao-whatsapp";
    detalheComprar.href = `https://wa.me/5587991065384?text=${encodeURIComponent(`Olá, tenho interesse neste produto!\n\nNome: ${produto.nome}\nValor: R$ ${produto.preco.toFixed(2)}`)}`;
    detalheComprar.target = "_blank";
  }
  
  // Configurar eventos
  document.querySelector(".fechar-detalhe").onclick = fecharDetalhe;
  document.querySelector(".detalhe-overlay").onclick = fecharDetalhe;
  
  // Exibir modal
  document.getElementById("produto-detalhe").style.display = "block";
}

function fecharDetalhe() {
  document.getElementById("produto-detalhe").style.display = "none";
}

// Função para voltar ao topo
function voltarAoTopo() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Carregar dados do localStorage primeiro
  carregarDadosDoLocalStorage();
  
  // Inicializar filtros
  produtosFiltrados = [...produtos];
  
  // Inicializar banner
  mostrarSlide(slideIndex);
  iniciarRotacaoAutomatica();
  
  // Carregar produtos
  carregarProdutos();
  
  // Configurar filtros de categoria
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filtrarPorCategoria(btn.dataset.category);
    });
  });
  
  // Configurar botão de voltar ao topo
  window.addEventListener("scroll", () => {
    const btnTopo = document.getElementById("btnTopo");
    if (window.scrollY > 300) {
      btnTopo.classList.add("visivel");
    } else {
      btnTopo.classList.remove("visivel");
    }
  });
  
  // Fechar lightbox e detalhes ao pressionar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fecharLightbox();
      fecharDetalhe();
    }
  });
});