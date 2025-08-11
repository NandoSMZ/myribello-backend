import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  // Limpiar datos de la tabla
  async onModuleInit() {
    try {
      // En lugar de dropDatabase, eliminar solo tus entidades
      const queryRunner = this.dataSource.createQueryRunner();

      // Desactivar restricciones de clave foránea temporalmente
      await queryRunner.query('SET CONSTRAINTS ALL DEFERRED');

      // Truncar tablas específicas (en el orden correcto para evitar conflictos de FK)
      await queryRunner.query('TRUNCATE TABLE product CASCADE');
      await queryRunner.query('TRUNCATE TABLE category CASCADE');

      // Reestablecer secuencias de IDs si es necesario
      await queryRunner.query('ALTER SEQUENCE product_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE category_id_seq RESTART WITH 1');

      // Activar restricciones de clave foránea
      await queryRunner.query('SET CONSTRAINTS ALL IMMEDIATE');

      await queryRunner.release();

      // Asegurar que las entidades están sincronizadas
      await this.dataSource.synchronize();

      console.log('Base de datos limpiada correctamente');
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
    }
  }

  // Inyeccion masiva de datos
  async seed() {
    await this.categoryRepository.save(categories);
    for (const seedProduct of products) {
      const category = await this.categoryRepository.findOneBy({
        id: seedProduct.categoryId,
      });
      if (!category) continue; // Skip this product if category not found
      const product = new Product();
      product.name = seedProduct.name;
      product.description = seedProduct.description;
      product.image = seedProduct.image;
      product.price = seedProduct.price;
      product.category = category;
      await this.productRepository.save(product);
    }
  }
}
