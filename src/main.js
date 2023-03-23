import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const prodSection = document.querySelector('.products');

function carregando() {
  const carregaSection = document.querySelector('.products');
  const span = document.createElement('span');
  span.classList = 'loading';
  span.innerHTML = 'carregando...';
  carregaSection.appendChild(span);
}

function carregou() {
  const span = document.querySelector('.loading');
  span.remove();
}

const mostrarProdutos = async () => {
  try {
    const request = await fetchProductsList('computador');
    request.forEach((product) => {
      prodSection.appendChild(createProductElement(product));
    });
    carregou();
  } catch (e) {
    console.log(e.message);
    throw new Error('Error...');
  }
};

const btnAdd = document.querySelectorAll('.product_add')[index];
btnAdd.addEventListener('click', addCarrinho);

const addCarrinho = async (idDoProduto) => {
  const id = await idDoProduto.target.parentNode.firstChild.innerText;
};

window.onload = function onload() {
  carregando();
  mostrarProdutos();
};
