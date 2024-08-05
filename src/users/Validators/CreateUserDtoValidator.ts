// src/common/pipes/validate-update-user.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: any) {
    const allowedKeys = [
      'email',
      'firstname',
      'lastname',
      'username',
      'password',
    ];
    const filteredValue = {};

    // Remove any extra fields
    for (const key of allowedKeys) {
      if (value[key] !== undefined) {
        filteredValue[key] = value[key];
      }
    }

    // Check if the DTO is not empty
    if (Object.keys(filteredValue).length === 0) {
      throw new BadRequestException(
        'All properties must be provided as required.',
      );
    }

    return filteredValue;
  }
}
