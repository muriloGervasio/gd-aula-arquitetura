import { ValueObject } from './value-object';

export type CurrencyType = 'BRL' | 'USD';

export interface CurrencyVoProps {
  value: number;
  currency: CurrencyType;
}

export class CurrencyVo extends ValueObject<CurrencyVoProps> {
  public static createCurrency(value: number): CurrencyVo;
  public static createCurrency(currency: CurrencyType): CurrencyVo;
  public static createCurrency(
    value: number,
    currency: CurrencyType,
  ): CurrencyVo;
  public static createCurrency(
    valueOrCurrency: number | CurrencyType,
    currency?: CurrencyType,
  ) {
    if (typeof valueOrCurrency === 'number' && currency) {
      return new CurrencyVo({ value: valueOrCurrency, currency });
    }

    if (typeof valueOrCurrency === 'string') {
      return new CurrencyVo({ value: 0, currency: valueOrCurrency });
    }

    return new CurrencyVo({ value: valueOrCurrency, currency: 'BRL' });
  }

  equals(vo: ValueObject<CurrencyVoProps>): boolean {
    return (
      vo.getValue().currency === this.getValue().currency &&
      vo.getValue().value === this.getValue().value
    );
  }

  adicionar(valor: CurrencyVo): CurrencyVo {
    if (valor.getValue().currency !== this.props.currency) return undefined;
    return CurrencyVo.createCurrency(
      this.getValue().value + valor.getValue().value,
      this.props.currency,
    );
  }
}
