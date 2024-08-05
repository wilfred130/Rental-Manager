// src/property/validators/update-property-validator.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdatePropertyDto } from '../PropertyDtos/UpdatePropety.dto';

@Injectable()
export class UpdatePropertyValidator implements PipeTransform {
  async transform(value: any): Promise<UpdatePropertyDto> {
    const allowedFields = [
      'address',
      'location',
      'type',
      'price',
      'period',
      'description',
      'images',
    ];

    const object = plainToClass(UpdatePropertyDto, value);

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
    }, new UpdatePropertyDto());
  }
}
