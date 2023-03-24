export const fetchProduct = async ($ProductID) => {
  if ($ProductID) {
    const url = `https://api.mercadolibre.com/items/${$ProductID}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } throw new Error('ID não informado');
};

export const fetchProductsList = async ($QUERY) => {
  if ($QUERY) {
    return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`)
      .then((response) => response.json())
      .then((data) => data.results);
  } throw new Error('Termo de busca não informado');
};
