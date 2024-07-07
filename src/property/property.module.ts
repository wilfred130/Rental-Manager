import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PropertyController } from './controllers/property/property.controller';
import { PropertyService } from './services/property/property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/Typeorm/Entities/Property';
import { User } from 'src/Typeorm/Entities/User';
import { UsersModule } from 'src/users/users.module';
import { IdExistsPipe } from 'src/users/Validators/UserValidatorById';
import { UsersService } from 'src/users/services/users/users.service';
import { PasswordService } from 'src/users/utils/bcrypt';
import { PropertyExistsPipe } from './Validators/PropertyExists.validator';
import { LandordExistsPipe } from './Validators/LandLordExist.validator';
import { CreatePropertyValidator } from './Validators/CreateProperty.dto.validator';
import { PropertyExistsMiddleware } from './Middleware/ImageUpload.middleware';
import { UpdatePropertyValidator } from './Validators/UpdateProperty.validator';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Property, User])
  ],
  controllers: [PropertyController,],
  providers: [PropertyService,IdExistsPipe, UsersService, 
    PasswordService, PropertyExistsPipe, LandordExistsPipe,
    CreatePropertyValidator, UpdatePropertyValidator,
  ]
})
export class PropertyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PropertyExistsMiddleware)
      .forRoutes({path: 'property/:id/images', method: RequestMethod.POST})
  }
}
