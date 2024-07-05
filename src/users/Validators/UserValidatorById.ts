// src/common/pipes/user-exists.pipe.ts
import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';


@Injectable()
export class IdExistsPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any) {

    const user = await this.userService.findOne(value);
    if (!user) {
      throw new NotFoundException(`User with ID ${value} not found`);
    }
    return value;
  }
}
