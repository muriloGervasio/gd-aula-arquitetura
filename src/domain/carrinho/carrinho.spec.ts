import { Carrinho } from './carrinho';
import { ItemDoCarrinho } from './produto-do-carrinho.entity';
import { CurrencyVo } from '../currency.vo';
import { ProductID } from '../produto/produto.id';

describe('carrinho', () => {
  it('should create a cart with an item ', () => {
    const item = new ItemDoCarrinho({
      preco: CurrencyVo.createCurrency(100),
      produtoId: new ProductID(1),
      quantidade: 10,
    });

    const carrinho = Carrinho.create(item);

    expect(carrinho.total).toEqual(CurrencyVo.createCurrency(1000));
  });
});
