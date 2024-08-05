import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';

@Injectable()
export class LastnameExistsPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value.lastname) {
      return;
    }
    return value;
  }
}
