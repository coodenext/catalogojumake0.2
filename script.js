// Dados dos produtos (fixos, já que não temos mais o painel admin)
let produtos = [
  {
    id: 1,
    nome: "KIT Primer Facial – Phállebeaut / Esponja Chanfrada / 4 Angels Corretivo Líquido",
    preco: 41.99,
    imagens: ["https://github.com/coodenext/catalogojumake/blob/main/imagens/2%20(1).jpg?raw=true"],
    estoque: 3,
    categoria: "Kits",
    descricao: ""
  },
  {
    id: 2,
    nome: "KIT On The Glow Blush – Fabella / Sérum Vitamina C – Phállebeauty / Iluminador Líquido - Febella",
    preco: 59.99,
    imagens: ["https://github.com/coodenext/catalogojumake/blob/main/imagens/2%20(2).jpg?raw=true"],
    estoque: 1,
    categoria: "Kits",
    descricao: ""
  },
  {
    id: 3,
    nome: "KIT Paleta de Blush Febella – 3 Tonalidades / Gel Creme Hidratante Facial – Phállebeauty / Gloss - Febella",
    preco: 56.99,
    imagens: ["https://github.com/coodenext/catalogojumake/blob/main/imagens/2%20(3).jpg?raw=true"],
    estoque: 3,
    categoria: "kits",
    descricao: ""
  },
  {
    id: 4,
    nome: "4 Angels Corretivo Líquido",
    preco: 15,
    imagens: ["https://github.com/coodenext/catalogojumake/blob/main/imagens/1%20(1).jpg?raw=true"],
    estoque: 5,
    categoria: "Rosto",
    descricao: "4 Angels Corretivo Líquido – Alta cobertura, toque leve e acabamento natural. Disfarça olheiras e imperfeições sem craquelar!"
  },
  {
    id: 5,
    nome: "4 Angels PÓ COMPACTO",
    preco: 15,
    imagens: ["https://cdn.awsli.com.br/616/616737/produto/2560617619afaaed285.jpg"],
    estoque: 1,
    categoria: "Rosto",
    descricao: "Acabamento aveludado, cobertura leve a média e controle da oleosidade. Ideal para selar a make e deixar a pele impecável o dia todo!"
  },
  {
    id: 6,
    nome: "Pó Banana / Bem Me Quero",
    preco: 11,
    imagens: ["https://cdn.awsli.com.br/2500x2500/404/404800/produto/332173930/p--banana---prova-d--gua-finalizador-bem-me-quero-eab225kaae.png"],
    estoque: 3,
    categoria: "Rosto",
    descricao: "Pó Banana Bem Me Quero – Acabamento aveludado, controla a oleosidade e sela a maquiagem com leveza e perfeição!"
  },
  {
    id: 7,
    nome: "Blindagem Febella",
    preco: 20,
    imagens: ["https://cdn.sistemawbuy.com.br/arquivos/493791f8fa3095fedcf60d101eb07a49/produtos/68064d127dcbf/1000000115-68064d12b22a2_mini.jpg"],
    estoque: 6,
    categoria: "Rosto",
    descricao: "Blindagem Febella – Proteção intensa, brilho duradouro e cabelos mais fortes desde a primeira aplicação!"
  },
  {
    id: 8,
    nome: "On The Glow Blush – Fabella",
    preco: 24,
    imagens: ["https://acdn-us.mitiendanube.com/stores/005/612/559/products/img_7539-d43b7efad0849aff0117395466880273-480-0.jpeg"],
    estoque: 2,
    categoria: "Kits",
    descricao: "Blush cremoso com efeito natural e luminoso, perfeito para um toque de cor e viço na pele!"
  },
  {
    id: 9,
    nome: "Iluminador Líquido - Febella",
    preco: 23,
    imagens: ["https://down-br.img.susercontent.com/file/br-11134207-7r98o-m33ta217k64l86"],
    estoque: 2,
    categoria: "Rosto",
    descricao: "Iluminador Líquido – Febella – Brilho radiante e acabamento suave para realçar os pontos altos do rosto com naturalidade!"
  },
  {
    id: 10,
    nome: "Paleta de Sombras Glam 12 S / Vivai",
    preco: 18,
    imagens: ["https://www.vivaicosmeticos.com.br/wp-content/uploads/2024/09/vivai-4103.1.1-estojo-de-sombras-glam-1.jpg"],
    estoque: 2,
    categoria: "Kits",
    descricao: "Paleta de Sombras Glam 12 S – Vivai – Cores pigmentadas e versáteis, com acabamentos matte e cintilante para criar looks do dia à noite!"
  },
  {
    id: 11,
    nome: "Lápis Marrom com Apontador – VIVAI",
    preco: 3,
    imagens: ["https://www.vivaicosmeticos.com.br/wp-content/uploads/2021/02/Vivai-2040.1.4-Lapis-Marrom-c-apontador-3-1.png"],
    estoque: 2,
    categoria: "Olhos",
    descricao: "Lápis Marrom com Apontador – VIVAI – Traço preciso, textura macia e praticidade com apontador acoplado! Ideal para olhos ou sobrancelhas."
  },
  {
    id: 12,
    nome: "Máscara para Cílios Black ALL Day / Vivai",
    preco: 14,
    imagens: ["https://images.tcdn.com.br/img/img_prod/1360034/mascara_de_cilios_black_all_day_vivai_12625_1_17fbc5f668acb213484bd985a6516a23.jpg", "https://www.revendadecosmeticos.com.br/media/catalog/product/b/l/black_abt_jpg.webp"],
    estoque: 2,
    categoria: "Olhos",
    descricao: "Volume, definição e longa duração para cílios intensamente pretos o dia todo!"
  },
  {
    id: 13,
    nome: "Sabonete Líquido Moranguinho",
    preco: 8,
    imagens: ["https://down-br.img.susercontent.com/file/sg-11134201-7rdxl-lydzkjpmntomf2"],
    estoque: 3,
    categoria: "Skincare",
    descricao: "Sabonete Líquido Moranguinho – Limpeza suave com cheirinho delicioso de morango e toque hidratante para a pele!"
  },
  {
    id: 14,
    nome: "Kit 13 Pincéis Profissionais",
    preco: 22,
    imagens: ["https://down-br.img.susercontent.com/file/br-11134207-7r98o-lu0z3lb0w6lhbd", "https://cdn.sistemawbuy.com.br/arquivos/c18c13dec3fcd6d1e1ed777c8b68b793/produtos/66d792ef8f1ad/marron-1-66d792eff4164.jpg"],
    estoque: 2,
    categoria: "Rosto",
    descricao: "Conjunto completo para uma maquiagem impecável, com pincéis de alta qualidade para todos os detalhes!"
  },
  {
    id: 15,
    nome: "Esponja Chanfrada",
    preco: 5,
    imagens: ["https://dcdn-us.mitiendanube.com/stores/002/066/913/products/1_20241126_144045_0000-6186c620e25786d11117326429582850-1024-1024.png"],
    estoque: 4,
    categoria: "Rosto",
    descricao: "Aplicação precisa e uniforme, perfeita para contorno e áreas difíceis de alcançar. Deixa a maquiagem impecável!"
  },
  {
    id: 16,
    nome: "Primer Facial – Phállebeaut",
    preco: 22,
    imagens: ["https://i0.wp.com/loja10makeup.com.br/wp-content/uploads/2024/04/primer-4.png"],
    estoque: 3,
    categoria: "Rosto",
    descricao: "Preparação perfeita para a pele, controla a oleosidade e aumenta a durabilidade da maquiagem!"
  },
  {
    id: 17,
    nome: "Bruma Matte – Phallebeauty",
    preco: 17,
    imagens: ["https://cdn.awsli.com.br/2500x2500/2476/2476835/produto/315166454/produto-p-site--61--qy7nneuvsg.png"],
    estoque: 2,
    categoria: "Rosto",
    descricao: "Fixação prolongada e acabamento matte, controlando a oleosidade e deixando a maquiagem intacta o dia todo!"
  },
  {
    id: 18,
    nome: "Kit Mini Esponjinhas – Powder Puff",
    preco: 7,
    imagens: ["https://down-br.img.susercontent.com/file/br-11134207-7qukw-lfpl6yvqo4da9c", "https://down-br.img.susercontent.com/file/br-11134201-23010-ol1a0igm8rmv05"],
    estoque: 2,
    categoria: "Rosto",
    descricao: "Esponjinhas práticas e perfeitas para aplicação de pó, corretivo e retoques rápidos. Ideal para viagens!"
  },
  {
    id: 19,
    nome: "Sérum Vitamina C – Phállebeauty",
    preco: 14,
    imagens: ["https://cdn.awsli.com.br/2500x2500/2677/2677742/produto/259033355/screenshot_20231227_083703_all-pdf-reader-sar1cf5z1v.jpg"],
    estoque: 1,
    categoria: "Skincare",
    descricao: "Revitalização intensa, uniformização do tom da pele e combate aos sinais de envelhecimento. Pele radiante e saudável!"
  },
  {
    id: 20,
    nome: "Máscara Facial Gold – Phállebeauty",
    preco: 17,
    imagens: ["https://cdn.dooca.store/144771/products/vbyxyyv0yehvl7edyk0jb4e1ognfwh0u3zyj_450x600.png?v=1719952075&webp=0"],
    estoque: 2,
    categoria: "Skincare",
    descricao: "Máscara Facial Gold – Phállebeauty – Hidratação profunda e rejuvenescimento instantâneo, com efeito luminoso e revitalizante para a pele!"
  },
  {
    id: 21,
    nome: "Gel Creme Hidratante Facial – Phállebeauty",
    preco: 20,
    imagens: ["https://loja10makeup.com.br/wp-content/uploads/2023/08/Hidratante-facial-1.png"],
    estoque: 1,
    categoria: "Kits",
    descricao: "Hidratação intensa e rápida absorção, deixando a pele macia, fresca e revitalizada!"
  },
  {
    id: 22,
    nome: "Espuma Facial Morango - Nelô",
    preco: 17,
    imagens: ["https://dcdn-us.mitiendanube.com/stores/004/666/328/products/whatsapp-image-2025-05-16-at-10-34-44-2-ef50dd92f7b91f6d3717474030384673-1024-1024.jpeg"],
    estoque: 1,
    categoria: "Rosto",
    descricao: "Limpeza suave com um toque doce de morango, removendo impurezas e deixando a pele macia e refrescante!"
  },
  {
    id: 23,
    nome: "Gel Incolor Fix & Antifrizz – Mia Make",
    preco: 15,
    imagens: ["https://down-br.img.susercontent.com/file/sg-11134201-7rep8-m2cv61glz3nnaa"],
    estoque: 2,
    categoria: "Olhos",
    descricao: "Controle de frizz e fixação sem pesar, deixando o cabelo suave, disciplinado e com brilho natural"
  },
  {
    id: 24,
    nome: "Base Líquida Lua e Neve",
    preco: 28,
    imagens: ["https://github.com/coodenext/catalogojumake/blob/main/imagens/1%20(11).jpg?raw=true"],
    estoque: 0,
    categoria: "Rosto",
    descricao: "Cobertura média e acabamento impecável, proporcionando uma pele uniforme e radiante o dia todo!"
  },
  {
    id: 25,
    nome: "Paleta de Contorno Febella – 6 Cores",
    preco: 23,
    imagens: ["https://imageswscdn.wslojas.com.br/files/27181/PEQ_produto-paleta-de-contorno-6-cores-contour-febella-makeup-3565.png", "https://imageswscdn.wslojas.com.br/files/27181/produto-paleta-de-contorno-6-cores-contour-febella-makeup-4380.jpg"],
    estoque: 4,
    categoria: "Rosto",
    descricao: "Contorno perfeito com 6 tonalidades versáteis para modelar e iluminar o rosto de forma natural e sofisticada!"
  },
  {
    id: 26,
    nome: "Paleta de Blush Febella – 3 Tonalidades",
    preco: 19,
    imagens: ["https://down-br.img.susercontent.com/file/sg-11134201-7rccw-lsy20udepa5u86"],
    estoque: 2,
    categoria: "Rosto",
    descricao: "Cores vibrantes e naturais para dar vida e cor às suas bochechas com acabamento perfeito!"
  },
  {
    id: 27,
    nome: "Gloss - Febella",
    preco: 19,
    imagens: ["https://cdn.awsli.com.br/939/939845/produto/261644583/lip_gloss_e_brilho_labial_kiko_a_febella_makeup_7895_1_3ec3860c5a399bb428fc990cc-obhj9kz96q.jpg"],
    estoque: 1,
    categoria: "Lábios",
    descricao: "Brilho intenso, lábios irresistíveis! Textura leve, hidratação na medida e um acabamento que valoriza qualquer look."
  },
  {
    id: 28,
    nome: "Gloss Gold Magic – Febella",
    preco: 13,
    imagens: ["https://down-br.img.susercontent.com/file/br-11134207-7r98o-locne33z4sav58"],
    estoque: 0,
    categoria: "Labios",
    descricao: "Realce seus lábios com um acabamento luxuoso e radiante. Com partículas de brilho dourado, o Gold Magic oferece hidratação, volume e um visual glamouroso que transforma qualquer make. Ideal para quem ama se destacar!"
  },
  {
    id: 29,
    nome: "Batom Acabamento Matte (A) Cores Sortidas - Lua & Neve",
    preco: 11,
    imagens: ["https://shre.ink/e7y1"],
    estoque: 0,
    categoria: "Labios",
    descricao: "Com acabamento aveludado e alta fixação, o Batom Matte Lua & Neve entrega cor intensa, conforto e estilo. Cores sortidas para combinar com todos os momentos."
  },
];

// Banners fixos
let banners = [
  { id: 1, titulo: "Banner Principal", imagem: "https://github.com/coodenext/catalogojumake0.2/blob/main/ban1_2.png?raw=true" },
  { id: 2, titulo: "Promoções", imagem: "https://github.com/coodenext/catalogojumake0.2/blob/main/ban1_1.png?raw=true" },
  { id: 3, titulo: "Novidades", imagem: "https://github.com/coodenext/catalogojumake0.2/blob/main/ban1_3.png?raw=true" }
];

// Variáveis globais
let slideIndex = 0;
let produtosFiltrados = [];
let categoriaAtual = "todos";
let termoBusca = "";

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar banners
  inicializarBanners();
  
  // Inicializar filtros
  produtosFiltrados = [...produtos];
  
  // Carregar produtos
  carregarProdutos();
  
  // Configurar botão de voltar ao topo
  window.addEventListener("scroll", () => {
    const btnTopo = document.getElementById("btnTopo");
    if (btnTopo) {
      if (window.scrollY > 300) {
        btnTopo.classList.add("visivel");
      } else {
        btnTopo.classList.remove("visivel");
      }
    }
  });
  
  // Fechar detalhes ao pressionar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fecharDetalhe();
    }
  });
});

// Função para inicializar banners
function inicializarBanners() {
  const bannerSlides = document.querySelector('.banner-slides');
  const dotsContainer = document.querySelector('.dots-container');
  
  if (!bannerSlides || !dotsContainer) return;
  
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
  
  // Iniciar o slideshow
  mostrarSlide(0);
  iniciarRotacaoAutomatica();
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
  
  if (!slides.length) return;
  
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
    const avaliacoes = localStorage.getItem("product_ratings");
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
    localStorage.setItem("product_ratings", JSON.stringify(avaliacoes));
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
    botao.href = `https://wa.me/5587992437345?text=${encodeURIComponent(`Olá, tenho interesse neste produto!\n\nNome: ${produto.nome}\nValor: R$ ${produto.preco.toFixed(2)}`)}`;
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
  const catalogo = document.getElementById("catalogo");
  if (!catalogo) return;
  
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
  const buscarProduto = document.getElementById("buscarProduto");
  if (!buscarProduto) return;
  
  const termo = buscarProduto.value.toLowerCase();
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
    detalheComprar.href = `https://wa.me/5587992437345?text=${encodeURIComponent(`Olá, tenho interesse neste produto!\n\nNome: ${produto.nome}\nValor: R$ ${produto.preco.toFixed(2)}`)}`;
    detalheComprar.target = "_blank";
  }
  
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