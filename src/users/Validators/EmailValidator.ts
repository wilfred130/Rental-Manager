import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UsersService } from '../services/users/users.service';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value.email) {
      const user = await this.userService.findByEmail(value.email);
      if (user) {
        throw new BadRequestException('Email already exists');
      } else if (!value.email) {
        return;
      }
    }
    return value;
  }
}
