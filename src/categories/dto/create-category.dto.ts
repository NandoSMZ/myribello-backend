import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  @IsString({
    message: 'El nombre de la categoría debe ser una cadena de texto.',
  })
  name: string;
}
