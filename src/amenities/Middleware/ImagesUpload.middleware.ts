// src/profile/middlewares/numeric-id-exists.middleware.ts
import { Injectable, NestMiddleware, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AmenitiesService } from '../services/amenities/amenities.service';

@Injectable()
export class AmenityExistsMiddleware implements NestMiddleware {
  constructor(
    @Inject(AmenitiesService) private readonly amenitiesService: AmenitiesService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id; // Parse the userId to number

    if (isNaN(id)) {
      throw new BadRequestException('Id must be numeric');
    }

    const amenity = await this.amenitiesService.findOne(id);
    if (!amenity) {
      throw new BadRequestException('Amenity doesnot exist');
    }

    next();
  }
}
