import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsDeliveryAddressRequired } from '../../common/decorators/is-delivery-address-required.decorator';
import { TransactionStatus } from '../enums/transaction-status.enum';

export class TransactionContentsDto {
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
  @IsInt({ message: 'Producto no válido' })
  productId: number;

  @IsNotEmpty({ message: 'Cantidad no puede estar vacía' })
  @IsInt({ message: 'Cantidad no válida' }) // Validate quantity too
  quantity: number;

  @IsNotEmpty({ message: 'Precio no puede estar vacío' })
  @IsNumber({}, { message: 'Precio no válido' })
  price: number;
}

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'El Numero Telefonico no puede ir vacio' })
  @IsNumber({}, { message: 'Numero Telefonico no válido' })
  phoneNumber: number;

  @IsNotEmpty({ message: 'El Nombre del Cliente no puede ir vacio' })
  @IsString({ message: 'Nombre del Cliente no válido' })
  customerName: string;

  @IsOptional()
  @IsString({ message: 'Comentarios no válidos' })
  comments?: string;

  @IsBoolean({ message: 'TakeAway no válido' })
  takeAway: boolean;

  @IsDeliveryAddressRequired({
    message:
      'La dirección de entrega es obligatoria cuando el pedido es para llevar',
  })
  @IsOptional()
  @IsString({ message: 'Dirección de entrega no válida' })
  deliveryAddress?: string;

  @IsOptional()
  @IsEnum(TransactionStatus, { message: 'Estado de transacción no válido' })
  status?: TransactionStatus;

  @IsArray()
  @ArrayNotEmpty({ message: 'Los Contenidos no pueden ir vacios' })
  @ValidateNested()
  @Type(() => TransactionContentsDto)
  contents: TransactionContentsDto[];
}
