export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async ($QUERY) => {
  // seu código aqui
  try {
    if (!$QUERY) {
      throw new Error('Termo de busca não informado');
    }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;
    const promisse = await fetch(url);
    const retorno = await promisse.json();
    return retorno.results;
  } catch (e) {
    return e;
  }
};
