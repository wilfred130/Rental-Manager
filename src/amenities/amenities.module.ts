import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AmenitiesController } from './contollers/amenities/amenities.controller';
import { AmenitiesService } from './services/amenities/amenities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenities } from 'src/Typeorm/Entities/Amenities';
import { Property } from 'src/Typeorm/Entities/Property';
import { PropertyExistsPipe } from 'src/property/Validators/PropertyExists.validator';
import { PropertyModule } from 'src/property/property.module';
import { PropertyService } from 'src/property/services/property/property.service';
import { User } from 'src/Typeorm/Entities/User';
import { CreateAmenitiesValidator } from './Validators/Create_amenities.validator';
import { UpdateAmenitiesValidator } from './Validators/Update_amenities.validator';
import { AmenityExistsPipe } from './Validators/amenities_exists.validator';
import { AmenityExistsMiddleware } from './Middleware/ImagesUpload.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Amenities, Property, User]),
    PropertyModule
  ],
  controllers: [AmenitiesController],
  providers: [AmenitiesService, PropertyExistsPipe, PropertyService, 
    CreateAmenitiesValidator, UpdateAmenitiesValidator, AmenityExistsPipe]
})
export class AmenitiesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AmenityExistsMiddleware)
      .forRoutes({path: 'amenities/:id/images', method: RequestMethod.POST})
  }
}
