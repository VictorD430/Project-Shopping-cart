import Swal from 'sweetalert2';
import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const prodSection = document.querySelector('.products');

function carregando() {
  const carregaSection = document.querySelector('.products');
  const span = document.createElement('span');
  span.classList = 'loading';
  span.innerHTML = 'carregando...';
  carregaSection.appendChild(span);
}

function carregaErro() {
  const carregaSection = document.querySelector('.products');
  const span = document.createElement('span');
  span.classList = 'error';
  span.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  carregaSection.appendChild(span);
}

function carregou() {
  const span = document.querySelector('.loading');
  span.remove();
}

const addCarrinho = () => {
  const carrinho = document.querySelector('.cart__products');
  const btnProd = document.querySelectorAll('.product__add');
  btnProd.forEach((produto) => {
    produto.addEventListener('click', async (event) => {
      const data = await fetchProduct(event.target.parentNode.firstChild.innerText);
      carrinho.appendChild(createCartProductElement(data));
      saveCartID(data);
    });
  });
};

const locStorageLoad = async () => {
  const carrinho = document.querySelector('.cart__products');
  const savedId = getSavedCartIDs();
  savedId.forEach(async ({ id }) => {
    const data = await fetchProduct(id);
    carrinho.appendChild(createCartProductElement(data));
  });
};

const mostrarProdutos = async () => {
  try {
    const request = await fetchProductsList('computador');
    if (!request) {
      throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
    }
    request.forEach((product) => {
      prodSection.appendChild(createProductElement(product));
    });
    carregou();
    addCarrinho();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error}`,
    });
    carregou();
    carregaErro();
  }
};

window.onload = function onload() {
  carregando();
  mostrarProdutos();
  locStorageLoad();
};
