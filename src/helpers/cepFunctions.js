export const getAddress = ($CEP) => {
  // seu código aqui
  const span = document.querySelector('.cart__address');
  const url1 = `https://cep.awesomeapi.com.br/json/${$CEP}`;
  const url2 = `https://brasilapi.com.br/api/cep/v2/${$CEP}`;
  const pSlow = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "Done eventually");
  });
  const pFast = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "Done quick");
  });
  Promise.any([pSlow, pFast]).then((value) => {
    console.log(value);
  });
};

export const searchCep = () => {
  // seu código aqui
  const textArea = document.querySelector('.cep-input');
  const btnSearch = docuent.querySelector('cep-button');
};
