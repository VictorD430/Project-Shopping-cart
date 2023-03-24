export const getAddress = (param) => {
  const { address, street, district, neighborhood, city, state } = param;
  const span = document.querySelector('.cart__address');
  if (Object.prototype.hasOwnProperty.call(param, 'city')) {
    if (Object.prototype.hasOwnProperty.call(param, 'address')) {
      span.innerText = `${address} - ${district} - ${city} - ${state}`;
    } else {
      span.innerText = `${street} - ${neighborhood} - ${city} - ${state}`;
    }
  } else {
    throw new Error('CEP não encontrado');
  }
};

export const searchCep = async () => {
  const span = document.querySelector('.cart__address');
  const $CEP = document.querySelector('.cep-input').value;
  const api1 = await fetch(`https://brasilapi.com.br/api/cep/v2/${$CEP}`);
  const api2 = await fetch(`https://cep.awesomeapi.com.br/json/${$CEP}`);
  const promises = [api1, api2];
  Promise.any(promises).then((result) => result.json())
    .then((retorno) => getAddress(retorno))
    .catch((error) => console.log(error.message))
    .then(span.innerText = 'CEP não encontrado');
};
