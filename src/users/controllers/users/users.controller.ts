import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/JwtAuthGuard';
import { ValidateCreateUserPipe } from 'src/users/Validators/CreateUserDtoValidator';
import { EmailExistsPipe } from 'src/users/Validators/EmailValidator';
import { ValidateUpdateUserPipe } from 'src/users/Validators/UpdateDTOValidator';
import { IdExistsPipe } from 'src/users/Validators/UserValidatorById';
import { FirstnameExistsPipe } from 'src/users/Validators/FirstnameValidator';
import { LastnameExistsPipe } from 'src/users/Validators/LastnameValidator';
import { UsernameExistsPipe } from 'src/users/Validators/UsernameValidator';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/userDTOs/CreateUserDto';
import { UpdateUserDto } from 'src/users/userDTOs/UpdateUserDto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @UsePipes(EmailExistsPipe, UsernameExistsPipe)
  createUser(
    @Body(new ValidationPipe(), ValidateCreateUserPipe)
    createUserDetails: CreateUserDto,
  ) {
    return this.usersService.create(createUserDetails);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe, IdExistsPipe) id: number,
    @Body(
      new ValidationPipe(),
      ValidateUpdateUserPipe,
      EmailExistsPipe,
      FirstnameExistsPipe,
      LastnameExistsPipe,
      UsernameExistsPipe,
    )
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe, IdExistsPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe, IdExistsPipe) id: number) {
    return this.usersService.deleteOne(id);
  }
}
