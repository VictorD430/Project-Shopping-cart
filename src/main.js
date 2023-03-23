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

function carregou() {
  const span = document.querySelector('.loading');
  span.remove();
}

// function nemCarregou(error) {
//   const span = document.querySelector('.loading');
//   console.log('erro recebido em nemCarregou', error);
//   span.innerHTML = `${error}`;
// }

const mostrarProdutos = async () => {
  try {
    const request = await fetchProductsList('computador');
    // .then((response) => {
    if (!request) {
      throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
    }
    request.forEach((product) => {
      prodSection.appendChild(createProductElement(product));
    });
    // });
    carregou();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error}`,
    });
    // console.log(e.message);
    // const erro = e.message;
    // const span = document.querySelector('.loading');
    // span.innerHTML = `${erro}`;
    // throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
  }
};

// const btnAdd = document.querySelectorAll('.product_add')[index];
// btnAdd.addEventListener('click', addCarrinho);

// const addCarrinho = async (idDoProduto) => {
//   const id = await idDoProduto.target.parentNode.firstChild.innerText;
// };

window.onload = function onload() {
  carregando();
  mostrarProdutos();
};
