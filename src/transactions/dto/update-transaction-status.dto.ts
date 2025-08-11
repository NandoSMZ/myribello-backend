import { IsEnum, IsNotEmpty } from 'class-validator';
import { TransactionStatus } from '../enums/transaction-status.enum';

export class UpdateTransactionStatusDto {
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  @IsEnum(TransactionStatus, { message: 'Estado de transacción no válido' })
  status: TransactionStatus;
}
