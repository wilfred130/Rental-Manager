import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Typeorm/Entities/User';
import { PasswordService } from './utils/bcrypt';
import { EmailExistsPipe } from './Validators/EmailValidator';
import { UsernameExistsPipe } from './Validators/UsernameValidator';
import { IdExistsPipe } from './Validators/UserValidatorById';
import { ValidateUpdateUserPipe } from './Validators/UpdateDTOValidator';
import { ValidateCreateUserPipe } from './Validators/CreateUserDtoValidator';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, EmailExistsPipe, UsernameExistsPipe, IdExistsPipe, ValidateUpdateUserPipe, ValidateCreateUserPipe ],
  exports: [UsersService]
})
export class UsersModule {}
