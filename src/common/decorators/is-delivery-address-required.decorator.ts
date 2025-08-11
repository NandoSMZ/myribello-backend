import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDeliveryAddressRequired(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDeliveryAddressRequired',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const obj = args.object as { takeAway: boolean };
          const takeAway = obj.takeAway;

          // Si takeAway es true (es para llevar/delivery), entonces deliveryAddress es requerido
          if (takeAway === true) {
            return Boolean(
              value && typeof value === 'string' && value.trim().length > 0,
            );
          }

          // Si takeAway es false (es para recoger), deliveryAddress no es requerido
          return true;
        },
        defaultMessage(): string {
          return 'La dirección de entrega es obligatoria cuando el pedido es para llevar';
        },
      },
    });
  };
}
