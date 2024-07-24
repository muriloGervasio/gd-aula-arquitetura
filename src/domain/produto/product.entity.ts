import { CurrencyVo } from '../currency.vo';
import { Entity } from '../entity';
import { ProductID } from './produto.id';

export interface ProductProps {
  name: string;
  price: CurrencyVo;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity extends Entity<ProductID, ProductProps> {
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
}
