let produtos = JSON.parse(localStorage.getItem("admin_produtos")) || [];
let editandoId = null;

document.addEventListener("DOMContentLoaded", () => {
  // Fecha modal ao clicar no X
  document.querySelectorAll(".close-modal").forEach(el => {
    el.addEventListener("click", fecharModal);
  });

  // Fecha modal ao clicar em cancelar
  document.getElementById("cancelProductBtn").addEventListener("click", fecharModal);

  // Abrir modal de produto
  document.getElementById("addProductBtn").addEventListener("click", abrirModalAdicionarProduto);

  // Salvar produto
  document.getElementById("productForm").addEventListener("submit", salvarProduto);

  atualizarTabelaProdutos();
});


function abrirModalAdicionarProduto() {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  editandoId = null;
  document.getElementById("productModal").style.display = "flex";
}

function fecharModal() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.style.display = "none";
  });
}

function salvarProduto(e) {
  e.preventDefault();
  const nome = document.getElementById("productName").value;
  const preco = parseFloat(document.getElementById("productPrice").value);
  const estoque = parseInt(document.getElementById("productStock").value);
  const categoria = document.getElementById("productCategory").value;
  const descricao = document.getElementById("productDescription").value.trim(); // <-- CAPTURA A DESCRIÇÃO
  const urlsTexto = document.getElementById("productImageUrls").value.trim();
  const imagens = urlsTexto.split("\n").filter(url => url.trim() !== "");

  if (!nome || isNaN(preco) || isNaN(estoque) || !categoria || imagens.length === 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const produto = {
    id: editandoId || (produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1),
    nome,
    preco,
    estoque,
    categoria,
    descricao, // <-- INCLUI NO OBJETO
    imagens
  };

  if (editandoId) {
    const index = produtos.findIndex(p => p.id === editandoId);
    produtos[index] = produto;
  } else {
    produtos.push(produto);
  }

  localStorage.setItem("admin_produtos", JSON.stringify(produtos));
  atualizarTabelaProdutos();
  fecharModal();
}


function atualizarTabelaProdutos() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";
  produtos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td><img src="${p.imagens[0]}" style="width:60px;height:60px;object-fit:cover;"></td>
      <td>${p.nome}</td>
      <td>R$ ${p.preco.toFixed(2)}</td>
      <td>${p.estoque}</td>
      <td>${p.categoria}</td>
      <td>
        <button onclick="editarProduto(${p.id})" class="btn btn-sm btn-outline">
  <i class="fas fa-pen-to-square"></i>
</button>
<button onclick="confirmarExclusao(${p.id})" class="btn btn-sm btn-danger">
  <i class="fas fa-trash-can"></i>
</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function confirmarExclusao(id) {
  const confirmModal = document.getElementById("confirmModal");
  confirmModal.style.display = "flex";
  const confirmBtn = document.getElementById("confirmBtn");

  confirmBtn.onclick = () => {
    excluirProduto(id);
    confirmModal.style.display = "none";
  };

  document.getElementById("cancelConfirmBtn").onclick = () => {
    confirmModal.style.display = "none";
  };
}

function excluirProduto(id) {
  produtos = produtos.filter(p => p.id !== id);
  localStorage.setItem("admin_produtos", JSON.stringify(produtos));
  atualizarTabelaProdutos();
}


function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  document.getElementById("productId").value = produto.id;
  document.getElementById("productName").value = produto.nome;
  document.getElementById("productPrice").value = produto.preco;
  document.getElementById("productStock").value = produto.estoque;
  document.getElementById("productCategory").value = produto.categoria;
  document.getElementById("productDescription").value = produto.descricao || "";
  document.getElementById("productImageURL").value = produto.imagens.join("\n"); // Corrigido ID
  editandoId = produto.id;
  document.getElementById("productModal").style.display = "flex";
}

function excluirProduto(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este produto?");
  if (!confirmar) return;
  produtos = produtos.filter(p => p.id !== id);
  localStorage.setItem("admin_produtos", JSON.stringify(produtos));
  atualizarTabelaProdutos();
}


function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  document.getElementById("productId").value = produto.id;
  document.getElementById("productName").value = produto.nome;
  document.getElementById("productPrice").value = produto.preco;
  document.getElementById("productStock").value = produto.estoque;
  document.getElementById("productCategory").value = produto.categoria;
  document.getElementById("productDescription").value = produto.descricao || "";
  document.getElementById("productImageUrls").value = produto.imagens.join("\n");
  editandoId = produto.id;
  document.getElementById("productModal").style.display = "flex";
}
