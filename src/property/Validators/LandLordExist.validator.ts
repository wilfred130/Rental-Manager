// src/common/pipes/user-exists.pipe.ts
import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';



@Injectable()
export class LandordExistsPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any) {

    const landlord = await this.userService.findOne(value);
    if (!landlord) {
      throw new NotFoundException(`Landord with ID ${value} not found`);
    }
    return value;
  }
}
