// src/common/pipes/user-exists.pipe.ts
import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PropertyService } from '../services/property/property.service';

@Injectable()
export class PropertyeExistsPipe implements PipeTransform {
  constructor(private readonly propertyService: PropertyService) {}

  async transform(value: any) {

    const property = await this.propertyService.findOne(value);
    if (!property) {
      throw new NotFoundException(`Property with ID ${value} not found`);
    }
    return value;
  }
}
