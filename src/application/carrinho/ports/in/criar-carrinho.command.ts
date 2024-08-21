import { ProductID } from 'src/domain/produto/produto.id';

export class CriarCarrinhoCommand {
  constructor(
    public readonly produtoId: ProductID,
    public readonly quantidade: number,
  ) {}
}
