// src/property/validators/update-property-validator.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePropertyDto } from '../PropertyDtos/CreateProperty.dto';


@Injectable()
export class CreatePropertyValidator implements PipeTransform {
  async transform(value: any): Promise<CreatePropertyDto> {
    const allowedFields = [
      'address',
      'location',
      'type',
      'price',
      'period',
      'description',
      'images',
    ];

    const object = plainToClass(CreatePropertyDto, value);

    // Validate the transformed object using class-validator
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // Filter only allowed fields
    return allowedFields.reduce((dto, field) => {
      if (object[field] !== undefined) {
        dto[field] = object[field];
      }
      return dto;
    }, new CreatePropertyDto());
  }
}
