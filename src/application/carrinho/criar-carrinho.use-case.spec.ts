import { Produto } from '../../domain/produto/product.entity';
import { ProdutoRepository } from './ports/out/produto.repository';
import { CurrencyVo } from '../../domain/currency.vo';
import { CarrinhoRepository } from './ports/out/carrinho.repository';
import { CriarCarrinhoUseCase } from './criar-carrinho.use-case';
import { ProductID } from '../../domain/produto/produto.id';

describe('CriarCarrinhoUseCase', () => {
  let produtoRepositoryMock: ProdutoRepository;

  let carrinhoRepositoryMock: CarrinhoRepository;
  let carrinhoUseCase!: CriarCarrinhoUseCase;
  beforeEach(() => {
    produtoRepositoryMock = {
      getById: jest.fn().mockResolvedValue(
        new Produto(
          {
            createdAt: new Date(),
            name: 'Produto 1',
            price: CurrencyVo.createCurrency(100),
            updatedAt: new Date(),
          },
          new ProductID(1),
        ),
      ),
      persist: jest.fn(),
    };

    carrinhoRepositoryMock = {
      getById: jest.fn().mockResolvedValue(null),
      persist: jest.fn(),
    };

    carrinhoUseCase = new CriarCarrinhoUseCase(
      produtoRepositoryMock,
      carrinhoRepositoryMock,
    );
  });

  it('should not create if product not found', async () => {
    produtoRepositoryMock.getById = jest.fn().mockResolvedValue(null);

    expect(
      async () =>
        await carrinhoUseCase.execute({
          produtoId: new ProductID(2),
          quantidade: 10,
        }),
    ).rejects.toThrow('Product not found');
  });

  it('should create a new cart', async () => {
    await carrinhoUseCase.execute({
      produtoId: new ProductID(1),
      quantidade: 10,
    });

    expect(carrinhoRepositoryMock.persist).toHaveBeenCalledTimes(1);
  });
});
