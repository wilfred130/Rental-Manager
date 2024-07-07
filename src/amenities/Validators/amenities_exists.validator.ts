// src/common/pipes/user-exists.pipe.ts
import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AmenitiesService } from '../services/amenities/amenities.service';




@Injectable()
export class AmenityExistsPipe implements PipeTransform {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  async transform(value: any) {

    const landlord = await this.amenitiesService.findOne(value);
    if (!landlord) {
      throw new NotFoundException(`Amenity with ID ${value} not found`);
    }
    return value;
  }
}
