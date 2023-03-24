import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('fetch é chamado ao executar fetchProduct', async () => {
    fetchProduct('MLB1405519561');
    await expect(fetch).toHaveBeenCalled();
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1405519561';
    fetchProduct('MLB1405519561');
    await expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchProduct é uma estrutura de dados igual ao objeto', async () => {
    const dataTest = await fetchProduct('MLB1405519561');
    expect(dataTest).toEqual(product);
  });
  it('Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro.', async () => {
    try {
      await fetchProduct()
    } catch(error) {
      expect(error.message).toEqual('ID não informado');
    }
  });
});
