import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/users/utils/bcrypt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './Strategy/jwtConstants';
import { LocalStrategy } from './Strategy/LocalStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Typeorm/Entities/User';
import { JwtStrategy } from './Strategy/jwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60m'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,  UsersService, PasswordService, 
    LocalStrategy, JwtStrategy]
})
export class AuthModule {}
