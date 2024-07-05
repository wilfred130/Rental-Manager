// src/profile/middlewares/numeric-id-exists.middleware.ts
import { Injectable, NestMiddleware, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/profile/profile.service';


@Injectable()
export class NumericIdExistsMiddleware implements NestMiddleware {
  constructor(
    @Inject(ProfileService) private readonly profileService: ProfileService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id; // Parse the userId to number

    if (isNaN(id)) {
      throw new BadRequestException('Id must be numeric');
    }

    const profile = await this.profileService.findOne(id);
    if (!profile) {
      throw new BadRequestException('Profile doesnot exist');
    }

    next();
  }
}
