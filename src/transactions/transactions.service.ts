/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Between, FindManyOptions, Repository, In } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { TransactionStatus } from './enums/transaction-status.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(
      async (transactionEntityManager) => {
        const transaction = new Transaction();

        // Asignar todos los campos del DTO a la entidad
        transaction.phoneNumber = createTransactionDto.phoneNumber;
        transaction.customerName = createTransactionDto.customerName;
        transaction.comments = createTransactionDto.comments ?? '';
        transaction.takeAway = createTransactionDto.takeAway;
        transaction.deliveryAddress =
          createTransactionDto.deliveryAddress ?? '';
        transaction.status =
          createTransactionDto.status ?? TransactionStatus.CONFIRMADA;

        // Calcula el Total a partir de los productos y cantidades de contents
        let total = createTransactionDto.contents.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        // Si takeAway es true (para llevar/delivery), agregar $3000 al total
        if (createTransactionDto.takeAway === true) {
          total += 3000;
        }

        transaction.total = total;

        // Guardar la transacción primero para obtener el ID
        const savedTransaction =
          await transactionEntityManager.save(transaction);

        // Itera sobre cada contents verificando si el producto existe y si hay suficiente inventario
        for (const contents of createTransactionDto.contents) {
          const product = await transactionEntityManager.findOneBy(Product, {
            id: contents.productId,
          });
          const errors: string[] = [];
          if (!product) {
            errors.push(
              `Product with id ${contents.productId} not found in the database`,
            );
            throw new NotFoundException(errors);
          }

          // Crear y guardar el contenido de la transacción
          const transactionContents = new TransactionContents();
          transactionContents.price = contents.price;
          transactionContents.product = product;
          transactionContents.quantity = contents.quantity;
          transactionContents.transaction = savedTransaction;

          await transactionEntityManager.save(transactionContents);
        }
      },
    );
    return { message: 'Transaction created successfully' };
  }

  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true,
      },
    };

    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Invalid date format');
      }

      const start = startOfDay(date);
      const end = endOfDay(date);

      options.where = {
        transactionDate: Between(start, end),
      };
    }
    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        contents: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

  async findByPhoneNumber(phoneNumber: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        phoneNumber,
        status: In([
          TransactionStatus.CONFIRMADA,
          TransactionStatus.PREPARACION,
        ]), // Solo órdenes activas
      },
      relations: {
        contents: {
          product: true,
        },
      },
      order: {
        transactionDate: 'DESC',
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new NotFoundException(
        `No hay órdenes activas para el número de teléfono ${phoneNumber}`,
      );
    }

    return transactions;
  }

  async updateStatus(id: number, status: TransactionStatus) {
    const transaction = await this.findOne(id);
    transaction.status = status;
    await this.transactionRepository.save(transaction);
    return {
      message: `Estado de la transacción ${id} actualizado a ${status}`,
      transaction,
    };
  }

  async remove(id: number) {
    // Verifica si la transacción existe
    const transaction = await this.findOne(id);
    // Itersa sobre los contenidos de la transacción
    for (const contents of transaction.contents) {
      // Verifica si el producto existe
      const product = await this.productRepository.findOneBy({
        id: contents.product.id,
      });
      if (!product) {
        throw new NotFoundException(
          `Product with id ${contents.product.id} not found`,
        );
      }
      await this.productRepository.save(product);
      // Elimina todos los contenidos de la transacción
      const transactionContents =
        await this.transactionContentsRepository.findOneBy({
          id: contents.id,
        });
      if (transactionContents) {
        await this.transactionContentsRepository.remove(transactionContents);
      }
    }
    // Elimina la transacción
    await this.transactionRepository.remove(transaction);
    return { message: `Transaction with id ${id} deleted successfully` };
  }
}
