import { Repository } from 'src/application/repository';
import { Produto } from 'src/domain/produto/product.entity';

export abstract class ProdutoRepository extends Repository<Produto> {}
