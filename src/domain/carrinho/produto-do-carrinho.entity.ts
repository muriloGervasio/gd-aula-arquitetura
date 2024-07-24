import { Entity } from '../entity';
import { ProductID } from '../produto/produto.id';
import { ItemDoCarrinhoId } from './item-do-carrinho.id';
import { CurrencyVo } from '../currency.vo';

export interface ItemDoCarrinhoProps {
  quantidade: number;
  preco: CurrencyVo;
  produtoId: ProductID;
}

export class ItemDoCarrinho extends Entity<
  ItemDoCarrinhoId,
  ItemDoCarrinhoProps
> {
  validate(): string | undefined {
    if (this.props.quantidade <= 0) {
      return 'Quantity must be greater than 0';
    }
  }

  get quantidade(): number {
    return this.props.quantidade;
  }

  get produtoId(): ProductID {
    return this.props.produtoId;
  }

  get preco(): CurrencyVo {
    return this.props.preco;
  }
}
