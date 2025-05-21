// Dados temporários (simulando o banco de dados)
let produtos = [];
let banners = [];
let imagensTemporarias = [];
let bannerTemporario = null;
let itemParaExcluir = null;
let tipoExclusao = null;

// Elementos DOM
const productTable = document.getElementById('productTable');
const bannerGrid = document.getElementById('bannerGrid');
const productModal = document.getElementById('productModal');
const bannerModal = document.getElementById('bannerModal');
const confirmModal = document.getElementById('confirmModal');
const toast = document.getElementById('toast');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, inicializando painel...');
  
  // Carregar dados do localStorage ou usar dados padrão
  carregarDados();
  
  // Inicializar tabelas e grids
  atualizarTabelaProdutos();
  atualizarGridBanners();
  
  // Configurar tabs
  configurarTabs();
  
  // Configurar botões e eventos
  configurarEventos();
});

// Função para carregar dados do localStorage ou usar dados padrão
function carregarDados() {
  try {
    // Tentar carregar produtos do localStorage
    const produtosArmazenados = localStorage.getItem('admin_produtos');
    if (produtosArmazenados) {
      produtos = JSON.parse(produtosArmazenados);
      console.log('Produtos carregados do localStorage:', produtos.length);
    } else {
      // Se não existir, carregar do script.js
      carregarProdutosDoScript();
    }
    
    // Tentar carregar banners do localStorage
    const bannersArmazenados = localStorage.getItem('admin_banners');
    if (bannersArmazenados) {
      banners = JSON.parse(bannersArmazenados);
      console.log('Banners carregados do localStorage:', banners.length);
    } else {
      // Se não existir, criar banners padrão
      banners = [
        { id: 1, titulo: 'Banner 1', imagem: 'ban1_1.png' },
        { id: 2, titulo: 'Banner 2', imagem: 'ban1_2.png' },
        { id: 3, titulo: 'Banner 3', imagem: 'ban1_3.png' }
      ];
      salvarBanners();
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mostrarToast('Erro ao carregar dados', 'error');
  }
}

// Função para carregar produtos do script.js
function carregarProdutosDoScript() {
  try {
    // Verificar se a variável global 'produtos' do script.js está disponível
    if (typeof window.produtos !== 'undefined' && Array.isArray(window.produtos)) {
      console.log('Produtos encontrados no script.js:', window.produtos.length);
      // Converter formato do script.js para o formato do admin
      produtos = window.produtos.map(p => ({
        id: p.id,
        nome: p.nome,
        preco: p.preco,
        estoque: p.estoque,
        categoria: p.categoria,
        descricao: p.descricao || '',
        imagens: p.imagens || []
      }));
      salvarProdutos();
    } else {
      console.log('Produtos não encontrados no script.js, tentando extrair do código fonte');
      // Tentar extrair produtos do script.js
      fetch('script.js')
        .then(response => response.text())
        .then(text => {
          try {
            // Extrair array de produtos do script.js
            const match = text.match(/const\s+produtos\s*=\s*\[([\s\S]*?)\];/);
            if (match && match[0]) {
              // Criar um script temporário para avaliar o array
              const script = document.createElement('script');
              script.textContent = `
                window.tempProdutos = ${match[0].replace('const produtos =', '')};
              `;
              document.head.appendChild(script);
              
              // Verificar se os produtos foram extraídos
              if (window.tempProdutos && Array.isArray(window.tempProdutos)) {
                produtos = window.tempProdutos;
                salvarProdutos();
                atualizarTabelaProdutos();
                console.log('Produtos extraídos do script.js:', produtos.length);
              } else {
                criarProdutosExemplo();
              }
              
              // Remover o script temporário
              document.head.removeChild(script);
            } else {
              console.log('Não foi possível extrair produtos do script.js');
              criarProdutosExemplo();
            }
          } catch (e) {
            console.error('Erro ao avaliar produtos do script.js:', e);
            criarProdutosExemplo();
          }
        })
        .catch(error => {
          console.error('Erro ao carregar script.js:', error);
          criarProdutosExemplo();
        });
    }
  } catch (error) {
    console.error('Erro ao carregar produtos do script:', error);
    criarProdutosExemplo();
  }
}

// Função para criar produtos de exemplo
function criarProdutosExemplo() {
  console.log('Criando produtos de exemplo');
  produtos = [
    {
      id: 1,
      nome: "Batom Matte",
      preco: 25.90,
      estoque: 10,
      categoria: "Lábios",
      descricao: "Batom matte de longa duração",
      imagens: ["https://via.placeholder.com/300x300?text=Batom"]
    },
    {
      id: 2,
      nome: "Base Líquida",
      preco: 45.00,
      estoque: 5,
      categoria: "Rosto",
      descricao: "Base líquida de alta cobertura",
      imagens: ["https://via.placeholder.com/300x300?text=Base"]
    }
  ];
  salvarProdutos();
  atualizarTabelaProdutos();
}

// Função para salvar produtos no localStorage
function salvarProdutos() {
  localStorage.setItem('admin_produtos', JSON.stringify(produtos));
}

// Função para salvar banners no localStorage
function salvarBanners() {
  localStorage.setItem('admin_banners', JSON.stringify(banners));
}

// Configurar tabs
function configurarTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Tab clicada:', btn.dataset.tab);
      
      // Remover classe active de todos os botões e seções
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Adicionar classe active ao botão clicado e à seção correspondente
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      const section = document.getElementById(tabId);
      if (section) {
        section.classList.add('active');
      } else {
        console.error('Seção não encontrada:', tabId);
      }
    });
  });
}

// Configurar eventos
function configurarEventos() {
  // Botões de adicionar
  const addProductBtn = document.getElementById('addProductBtn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      console.log('Botão adicionar produto clicado');
      abrirModalAdicionarProduto();
    });
  }
  
  const addBannerBtn = document.getElementById('addBannerBtn');
  if (addBannerBtn) {
    addBannerBtn.addEventListener('click', () => {
      console.log('Botão adicionar banner clicado');
      abrirModalAdicionarBanner();
    });
  }
  
  // Formulários
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Formulário de produto enviado');
      salvarProduto();
    });
  }
  
  const bannerForm = document.getElementById('bannerForm');
  if (bannerForm) {
    bannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Formulário de banner enviado');
      salvarBanner();
    });
  }
  
  // Botões de cancelar
  const cancelProductBtn = document.getElementById('cancelProductBtn');
  if (cancelProductBtn) {
    cancelProductBtn.addEventListener('click', () => fecharModal(productModal));
  }
  
  const cancelBannerBtn = document.getElementById('cancelBannerBtn');
  if (cancelBannerBtn) {
    cancelBannerBtn.addEventListener('click', () => fecharModal(bannerModal));
  }
  
  const cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
  if (cancelConfirmBtn) {
    cancelConfirmBtn.addEventListener('click', () => fecharModal(confirmModal));
  }
  
  // Botão de confirmar exclusão
  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', confirmarExclusao);
  }
  
  // Fechar modais ao clicar no X
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      fecharModal(modal);
    });
  });
  
  // Upload de imagens de produto
  const productImages = document.getElementById('productImages');
  if (productImages) {
    productImages.addEventListener('change', handleProductImageUpload);
  }
  
  // Upload de imagem de banner
  const bannerImage = document.getElementById('bannerImage');
  if (bannerImage) {
    bannerImage.addEventListener('change', handleBannerImageUpload);
  }
  
  // Filtro e busca de produtos
  const searchProduct = document.getElementById('searchProduct');
  if (searchProduct) {
    searchProduct.addEventListener('input', filtrarProdutos);
  }
  
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filtrarProdutos);
  }
}

// Funções para gerenciar produtos
function atualizarTabelaProdutos(produtosFiltrados = null) {
  const tbody = productTable.querySelector('tbody');
  tbody.innerHTML = '';
  
  const produtosParaMostrar = produtosFiltrados || produtos;
  
  if (produtosParaMostrar.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="7" class="text-center">Nenhum produto encontrado</td>`;
    tbody.appendChild(tr);
    return;
  }
  
  produtosParaMostrar.forEach(produto => {
    const tr = document.createElement('tr');
    
    const imagemSrc = produto.imagens && produto.imagens.length > 0 
      ? produto.imagens[0] 
      : 'https://via.placeholder.com/300x300?text=Sem+Imagem';
    
    tr.innerHTML = `
      <td>${produto.id}</td>
      <td><img src="${imagemSrc}" alt="${produto.nome}" class="product-image" onerror="this.src='https://via.placeholder.com/50x50?text=Erro'"></td>
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>${produto.estoque}</td>
      <td>${produto.categoria}</td>
      <td class="actions">
        <button class="btn btn-outline btn-icon edit-product" data-id="${produto.id}" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger btn-icon delete-product" data-id="${produto.id}" title="Excluir">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
  
  // Adicionar eventos aos botões de ação
  document.querySelectorAll('.edit-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      editarProduto(id);
    });
  });
  
  document.querySelectorAll('.delete-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      confirmarExcluirProduto(id);
    });
  });
}

function filtrarProdutos() {
  const termo = document.getElementById('searchProduct').value.toLowerCase();
  const categoria = document.getElementById('categoryFilter').value;
  
  let produtosFiltrados = [...produtos];
  
  // Filtrar por termo de busca
  if (termo) {
    produtosFiltrados = produtosFiltrados.filter(produto => {
      return produto.nome.toLowerCase().includes(termo) || 
             (produto.descricao && produto.descricao.toLowerCase().includes(termo));
    });
  }
  
  // Filtrar por categoria
  if (categoria && categoria !== 'todos') {
    produtosFiltrados = produtosFiltrados.filter(produto => produto.categoria === categoria);
  }
  
  atualizarTabelaProdutos(produtosFiltrados);
}

function abrirModalAdicionarProduto() {
  // Limpar formulário
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productModalTitle').textContent = 'Adicionar Produto';
  
  // Limpar previews de imagens
  imagensTemporarias = [];
  document.getElementById('imagePreviewContainer').innerHTML = '';
  
  // Abrir modal
  abrirModal(productModal);
}

function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  // Preencher formulário
  document.getElementById('productId').value = produto.id;
  document.getElementById('productName').value = produto.nome;
  document.getElementById('productPrice').value = produto.preco;
  document.getElementById('productStock').value = produto.estoque;
  document.getElementById('productCategory').value = produto.categoria;
  document.getElementById('productDescription').value = produto.descricao || '';
  
  // Atualizar título do modal
  document.getElementById('productModalTitle').textContent = 'Editar Produto';
  
  // Carregar imagens existentes
  imagensTemporarias = [...produto.imagens];
  atualizarPreviewImagens();
  
  // Abrir modal
  abrirModal(productModal);
}

function salvarProduto() {
  // Obter valores do formulário
  const id = document.getElementById('productId').value;
  const nome = document.getElementById('productName').value;
  const preco = parseFloat(document.getElementById('productPrice').value);
  const estoque = parseInt(document.getElementById('productStock').value);
  const categoria = document.getElementById('productCategory').value;
  const descricao = document.getElementById('productDescription').value;
  
  if (id) {
    // Atualizar produto existente
    const index = produtos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      produtos[index] = {
        ...produtos[index],
        nome,
        preco,
        estoque,
        categoria,
        descricao,
        imagens: imagensTemporarias
      };
      
      mostrarToast('Produto atualizado com sucesso!');
    }
  } else {
    // Adicionar novo produto
    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    
    const novoProduto = {
      id: novoId,
      nome,
      preco,
      estoque,
      categoria,
      descricao,
      imagens: imagensTemporarias
    };
    
    produtos.push(novoProduto);
    mostrarToast('Produto adicionado com sucesso!');
  }
  
  // Salvar no localStorage
  salvarProdutos();
  
  // Atualizar tabela e fechar modal
  atualizarTabelaProdutos();
  fecharModal(productModal);
}

function confirmarExcluirProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  document.getElementById('confirmMessage').textContent = `Tem certeza que deseja excluir o produto "${produto.nome}"?`;
  
  itemParaExcluir = id;
  tipoExclusao = 'produto';
  
  abrirModal(confirmModal);
}

function excluirProduto(id) {
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos.splice(index, 1);
    salvarProdutos();
    atualizarTabelaProdutos();
    mostrarToast('Produto excluído com sucesso!');
  }
}

// Funções para gerenciar banners
function atualizarGridBanners() {
  bannerGrid.innerHTML = '';
  
  if (banners.length === 0) {
    bannerGrid.innerHTML = '<div class="text-center">Nenhum banner cadastrado</div>';
    return;
  }
  
  banners.forEach(banner => {
    const div = document.createElement('div');
    div.className = 'banner-item';
    
    div.innerHTML = `
      <img src="${banner.imagem}" alt="${banner.titulo || 'Banner'}" onerror="this.src='https://via.placeholder.com/800x300?text=Banner'">
      <div class="banner-overlay">
        <span class="banner-title">${banner.titulo || 'Banner sem título'}</span>
        <button class="btn btn-danger btn-icon delete-banner" data-id="${banner.id}" title="Excluir">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    
    bannerGrid.appendChild(div);
  });
  
  // Adicionar eventos aos botões de exclusão
  document.querySelectorAll('.delete-banner').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      confirmarExcluirBanner(id);
    });
  });
}

function abrirModalAdicionarBanner() {
  // Limpar formulário
  document.getElementById('bannerForm').reset();
  
  // Limpar preview
  bannerTemporario = null;
  document.getElementById('bannerPreview').innerHTML = `
    <i class="fas fa-image"></i>
    <span>Nenhuma imagem selecionada</span>
  `;
  
  // Abrir modal
  abrirModal(bannerModal);
}

function salvarBanner() {
  const titulo = document.getElementById('bannerTitle').value;
  
  if (!bannerTemporario) {
    mostrarToast('Selecione uma imagem para o banner', 'error');
    return;
  }
  
  // Adicionar novo banner
  const novoId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
  
  const novoBanner = {
    id: novoId,
    titulo: titulo || `Banner ${novoId}`,
    imagem: bannerTemporario
  };
  
  banners.push(novoBanner);
  
  // Salvar no localStorage
  salvarBanners();
  
  // Atualizar grid e fechar modal
  atualizarGridBanners();
  fecharModal(bannerModal);
  
  mostrarToast('Banner adicionado com sucesso!');
}

function confirmarExcluirBanner(id) {
  const banner = banners.find(b => b.id === id);
  if (!banner) return;
  
  document.getElementById('confirmMessage').textContent = `Tem certeza que deseja excluir este banner?`;
  
  itemParaExcluir = id;
  tipoExclusao = 'banner';
  
  abrirModal(confirmModal);
}

function excluirBanner(id) {
  const index = banners.findIndex(b => b.id === id);
  if (index !== -1) {
    banners.splice(index, 1);
    salvarBanners();
    atualizarGridBanners();
    mostrarToast('Banner excluído com sucesso!');
  }
}

// Funções para manipulação de imagens
function handleProductImageUpload(e) {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    
    reader.onload = function(event) {
      imagensTemporarias.push(event.target.result);
      atualizarPreviewImagens();
    };
    
    reader.readAsDataURL(file);
  }
  
  // Limpar input para permitir selecionar o mesmo arquivo novamente
  e.target.value = '';
}

function atualizarPreviewImagens() {
  const container = document.getElementById('imagePreviewContainer');
  container.innerHTML = '';
  
  imagensTemporarias.forEach((src, index) => {
    const div = document.createElement('div');
    div.className = 'image-preview';
    
    div.innerHTML = `
      <img src="${src}" alt="Preview">
      <span class="remove-image" data-index="${index}">×</span>
    `;
    
    container.appendChild(div);
  });
  
  // Adicionar eventos para remover imagens
  document.querySelectorAll('.remove-image').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      imagensTemporarias.splice(index, 1);
      atualizarPreviewImagens();
    });
  });
}

function handleBannerImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  
  reader.onload = function(event) {
    bannerTemporario = event.target.result;
    
    const preview = document.getElementById('bannerPreview');
    preview.innerHTML = `<img src="${bannerTemporario}" alt="Preview do Banner">`;
  };
  
  reader.readAsDataURL(file);
}

// Funções de UI
function abrirModal(modal) {
  if (!modal) {
    console.error('Modal não encontrado');
    return;
  }
  
  console.log('Abrindo modal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function fecharModal(modal) {
  if (!modal) {
    console.error('Modal não encontrado');
    return;
  }
  
  console.log('Fechando modal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function confirmarExclusao() {
  if (tipoExclusao === 'produto') {
    excluirProduto(itemParaExcluir);
  } else if (tipoExclusao === 'banner') {
    excluirBanner(itemParaExcluir);
  }
  
  fecharModal(confirmModal);
}

function mostrarToast(mensagem, tipo = 'success') {
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  
  toastMessage.textContent = mensagem;
  
  if (tipo === 'success') {
    toastIcon.className = 'fas fa-check-circle';
  } else if (tipo === 'error') {
    toastIcon.className = 'fas fa-exclamation-circle';
  }
  
  toast.classList.add('show');
  
  // Esconder o toast após 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}