// src/property/validators/create-address-validator.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAddressDto } from '../PropertyDtos/CreateAddress.dto';

@Injectable()
export class CreateAddressValidator implements PipeTransform {
  async transform(value: any): Promise<CreateAddressDto> {
    const object = plainToClass(CreateAddressDto, value, {
      excludeExtraneousValues: true,
    });

    // Validate the transformed object using class-validator
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return object;
  }
}
