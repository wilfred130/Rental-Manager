import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { PasswordService } from 'src/users/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(PasswordService) private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && this.passwordService.compare(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    delete user.password;
    return { ...user, access_token: this.jwtService.sign(payload) };
  }
}
