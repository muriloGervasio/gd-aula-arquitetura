import { AggregateRoot } from '../aggregate';
import { CarrinhoId } from './carrinho.id';
import { ItemDoCarrinho } from './produto-do-carrinho.entity';
import { CurrencyVo } from '../currency.vo';

export interface CarrinhoProps {
  itens: ItemDoCarrinho[];
}

export class Carrinho extends AggregateRoot<CarrinhoId, CarrinhoProps> {
  validate(): string | undefined {
    if (this.props.itens.length === 0) {
      return 'Cart must have at least one item';
    }
    if (!this.total.equals(CurrencyVo.createCurrency(0))) {
      return 'Total must be greater than 0';
    }
  }

  get itens(): ItemDoCarrinho[] {
    return this.props.itens;
  }

  get total(): CurrencyVo {
    return this.props.itens.reduce(
      (acc, item) => acc.adicionar(item.preco),
      CurrencyVo.createCurrency(0),
    );
  }

  adicionarItem(item: ItemDoCarrinho) {
    this.props.itens.push(item);
  }

  removerItem(item: ItemDoCarrinho) {
    this.props.itens = this.props.itens.filter((i) => i.equals(item));
  }

  static create(item: ItemDoCarrinho) {
    return new Carrinho({ itens: [item] });
  }
}
