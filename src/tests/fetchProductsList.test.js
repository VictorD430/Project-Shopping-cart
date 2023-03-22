import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    fetchProductsList('computador');
    await expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProductsList('computador');
    await expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchProductsList é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const arg = await fetchProductsList('computador');
    expect(arg).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro.', async () => {
    const arg = await fetchProductsList();
    expect(arg).toEqual(new Error('Termo de busca não informado'));
  });
});
