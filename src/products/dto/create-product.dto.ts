import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsString({ message: 'description must be a string' })
  description?: string;

  @IsNotEmpty({ message: 'image is required' })
  image: string;

  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price invalid' })
  price: number;

  @IsNotEmpty({ message: 'categoryId is required' })
  @IsInt({ message: 'categoryId must be an integer' })
  categoryId: number;

  @IsOptional()
  @IsBoolean({ message: 'status must be a boolean' })
  status?: boolean;
}
