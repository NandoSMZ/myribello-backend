import { BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class IdValidationPipe extends ParseIntPipe {
  constructor() {
    super({
      errorHttpStatusCode: 422,
      exceptionFactory: () => new BadRequestException('ID no valido'),
    });
  }
}
