import { Product } from '../../products/entities/product.entity';
import { TransactionStatus } from '../enums/transaction-status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  transactionDate: Date;

  // Columna para numero telefonico del cliente
  @Column('bigint')
  phoneNumber: number;

  // Columna para el nombre del cliente
  @Column({ type: 'varchar', length: 100 })
  customerName: string;

  // Columna para comentarios adicionales
  @Column({ type: 'text', nullable: true })
  comments: string;

  // Para Recoger o Llevar
  @Column({ type: 'boolean', default: false })
  takeAway: boolean;

  // Direccion de entrega
  @Column({ type: 'text', nullable: true })
  deliveryAddress: string;

  // Estado de la orden
  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.CONFIRMADA,
  })
  status: TransactionStatus;

  @OneToMany(
    () => TransactionContents,
    (transaction) => transaction.transaction,
  )
  contents: TransactionContents[];
}

@Entity()
export class TransactionContents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
    cascade: true,
  })
  product: Product;

  @ManyToOne(() => Transaction, (transaction) => transaction.contents, {
    cascade: true,
  })
  transaction: Transaction;
}
