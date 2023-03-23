export const fetchProduct = async ($ProductID) => {
  // seu código aqui
  // try {
  //   const vazio = 'Nenhum item para ser adicionado';
  //   if ($QUERY === '') {
  //     throw new Error(vazio);
  //   }
  //   const url = `https://api.mercadolibre.com/items/${$ProductID}`;
  //   const promisse = await fetch(url);
  //   const retorno = await promisse.json();
  //   return retorno.results;
  // } catch (e) {
  //   console.log('catch', e.message);
  //   throw new Error('Nada foi adicionado');
  // }
};

export const fetchProductsList = async ($QUERY) => {
  // seu código aqui
  try {
    const vazio = 'Termo de busca não informado';
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;
    const promisse = await fetch(url);
    const retorno = await promisse.json();
    if ($QUERY === '' || $QUERY === retorno.length) {
      throw new Error(vazio);
    }
    return retorno.results;
  } catch (e) {
    console.log('catch', e.message);
    throw new Error('Termo de busca não informado');
  }
};
