import { PipeTransform } from '@nestjs/common';

export class EmailToLowerCasePipe implements PipeTransform {
  transform(value: { email?: string }) {
    if (value.email) {
      value.email = value.email.toLowerCase();
    }

    /*
    if (value !== value.toLowerCase()) {
      throw new BadRequestException(
        'El email debe estar completamente en minuscula',
      );
    }
    */

    return value;
  }
}
