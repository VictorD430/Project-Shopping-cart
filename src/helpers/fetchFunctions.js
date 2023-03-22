export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (param) => {
  // seu código aqui
  try {
    if (!param) {
      throw new Error('Termo de busca não informado');
    }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
  } catch (e) {
    return e;
  }
};
