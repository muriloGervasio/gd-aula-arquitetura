import { CarrinhoId } from 'src/domain/carrinho/carrinho.id';
import { UseCase } from '../use-case';
import { CriarCarrinhoCommand } from './ports/in/criar-carrinho.command';
import { ProdutoRepository } from './ports/out/produto.repository';
import { CarrinhoRepository } from './ports/out/carrinho.repository';
import { ItemDoCarrinho } from '../../domain/carrinho/produto-do-carrinho.entity';
import { Carrinho } from '../../domain/carrinho/carrinho';

export class CriarCarrinhoUseCase
  implements UseCase<CriarCarrinhoCommand, CarrinhoId>
{
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly carrinhoRepository: CarrinhoRepository,
  ) {}

  async execute(value: CriarCarrinhoCommand): Promise<CarrinhoId> {
    const produto = await this.produtoRepository.getById(value.produtoId);

    if (!produto) {
      throw new Error('Product not found');
    }

    const itemDoCarrinho = new ItemDoCarrinho({
      preco: produto.price,
      quantidade: value.quantidade,
      produtoId: produto.id,
    });

    const carrinho = Carrinho.create(itemDoCarrinho);

    await this.carrinhoRepository.persist(carrinho);

    return carrinho.id;
  }
}
