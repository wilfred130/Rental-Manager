// src/common/pipes/user-exists.pipe.ts
import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProfileService } from '../services/profile/profile.service';



@Injectable()
export class ProfileExistsPipe implements PipeTransform {
  constructor(private readonly profileService: ProfileService) {}

  async transform(value: any) {

    const user = await this.profileService.findOne(value);
    if (!user) {
      throw new NotFoundException(`Profile with ID ${value} not found`);
    }
    return value;
  }
}
