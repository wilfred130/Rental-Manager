
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  hash(password: string): string {
    const salt = bcrypt.genSaltSync(10); 
    return bcrypt.hashSync(password, salt);
  }

  compare(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
