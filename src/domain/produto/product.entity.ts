import { AggregateRoot } from '../aggregate';
import { CurrencyVo } from '../currency.vo';
import { ProductID } from './produto.id';

export interface ProductProps {
  name: string;
  price: CurrencyVo;
  createdAt: Date;
  updatedAt: Date;
}

export class Produto extends AggregateRoot<ProductID, ProductProps> {
  validate(): string | undefined {
    if (!this.props.name) {
      return 'Product name is required';
    }
    if (!this.props.price.equals(CurrencyVo.createCurrency(0))) {
      return 'Product price is required';
    }
  }

  get name(): string {
    return this.props.name;
  }

  get price(): CurrencyVo {
    return this.props.price;
  }

  static create(name: string, price: CurrencyVo): Produto {
    const produto = new Produto({
      createdAt: new Date(),
      updatedAt: new Date(),
      name,
      price,
    });
    return produto;
  }
}
