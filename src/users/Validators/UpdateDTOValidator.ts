// src/common/pipes/validate-update-user.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateUpdateUserPipe implements PipeTransform {
  transform(value: any) {
    const allowedKeys = ['email', 'firstName', 'lastName'];
    const filteredValue = {};

    // Remove any extra fields
    for (const key of allowedKeys) {
      if (value[key] !== undefined) {
        filteredValue[key] = value[key];
      }
    }

    // Check if the DTO is not empty
    if (Object.keys(filteredValue).length === 0) {
      throw new BadRequestException('All properties must be as required.');
    }

    return filteredValue;
  }
}
