// src/common/pipes/validate-update-user.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';


@Injectable()
export class ValidateCreateProfilePipe implements PipeTransform {
  transform(value: any) {
    const allowedKeys = [
        'firstName', 'lastName', 'profileImage',
        'physicalAddress', 'dob', 'socialMediaHandles', 
        'role'
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
      throw new BadRequestException('At least one property must be provided');
    }

    return filteredValue;
  }
}
