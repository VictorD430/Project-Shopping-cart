import Swal from 'sweetalert2';
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
const listaProdutos = (lista) => {
  const products = document.querySelector('.products');
  lista.forEach((result, index) => {
    products.appendChild(
      createProductElement(result),
    );
    document.querySelectorAll('.product__add')[index]
      .addEventListener('click', fetchProduct);
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
    // listaProdutos(request);
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

window.onload = function onload() {
  carregando();
  mostrarProdutos();
};
