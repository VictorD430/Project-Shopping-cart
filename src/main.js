import Swal from 'sweetalert2';
import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

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

const liProdutos = async () => {
  const carrinho = document.querySelector('.cart__products');
  const btnProd = document.querySelectorAll('.product__add');
  btnProd.forEach((produto) => {
    produto.addEventListener('click', async (event) => {
      console.log('evento', event);
      const prod = await fetchProduct(event.target.classList[1]);
      carrinho.appendChild(createCartProductElement(prod));
      localStorage.clear();
      saveCartID();
    });
  });
};

window.onload = function onload() {
  carregando();
  mostrarProdutos();
  liProdutos();
};
