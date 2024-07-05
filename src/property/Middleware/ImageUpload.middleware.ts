// src/profile/middlewares/numeric-id-exists.middleware.ts
import { Injectable, NestMiddleware, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PropertyService } from '../services/property/property.service';



@Injectable()
export class PropertyExistsMiddleware implements NestMiddleware {
  constructor(
    @Inject(PropertyService) private readonly propertyService: PropertyService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id; // Parse the userId to number

    if (isNaN(id)) {
      throw new BadRequestException('Id must be numeric');
    }

    const property = await this.propertyService.findOne(id);
    if (!property) {
      throw new BadRequestException('Property doesnot exist');
    }

    next();
  }
}
