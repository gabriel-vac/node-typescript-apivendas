import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepopsitory = getCustomRepository(ProductRepository);
    const productExists = await productsRepopsitory.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    // quando a gente usa o create, ele só cria o objeto, então não precisa do await
    const product = productsRepopsitory.create({
      name,
      price,
      quantity,
    });

    await productsRepopsitory.save(product);

    return product;
  }
}

export default CreateProductService;
