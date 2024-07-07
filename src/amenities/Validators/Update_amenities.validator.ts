// src/property/validators/update-property-validator.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateAmenitiesDto } from '../AmenitiesDto/Update_amenities.dto';


@Injectable()
export class UpdateAmenitiesValidator implements PipeTransform {
  async transform(value: any): Promise<UpdateAmenitiesDto> {
    const allowedFields = [
      'name',
      'description',
      'images'
    ];

    const object = plainToClass(UpdateAmenitiesDto, value);

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
    }, new UpdateAmenitiesDto());
  }
}
