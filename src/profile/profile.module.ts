import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/Typeorm/Entities/Profile';
import { User } from 'src/Typeorm/Entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PasswordService } from 'src/users/utils/bcrypt';
import { ProfileExistsPipe } from './Validators/CheckProfileExists.validator';
import { ValidateUpdateProfilePipe } from './Validators/UpdateProfileDto.validator';
import { ValidateCreateProfilePipe } from './Validators/CreateUserProfileDto.Validator';
import { NumericIdExistsMiddleware } from './Middleware/profileUpload.middleware';


@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    UsersModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, PasswordService, ProfileExistsPipe,
    ValidateUpdateProfilePipe, ValidateCreateProfilePipe
  ]
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NumericIdExistsMiddleware)
      .forRoutes({path: 'profile/:id/upload', method: RequestMethod.POST})
  }
}
