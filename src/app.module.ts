import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './Typeorm/Entities/User';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './Typeorm/Entities/Profile';
import { PropertyModule } from './property/property.module';
import { Property } from './Typeorm/Entities/Property';
import { AmenitiesModule } from './amenities/amenities.module';
import { Amenities } from './Typeorm/Entities/Amenities';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 120,
      max: 100
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname,'..', 'uploads/profileImages'),
        serveRoot: '/profileImages',
      },
      {
        rootPath: join(__dirname,'..', 'uploads/propertyImages'),
        serveRoot: '/propertyImages',
      },
      {
        rootPath: join(__dirname,'..', 'uploads/amenitiesImages'),
        serveRoot: '/amenitiesImages',
      }
    ),
    ConfigModule.forRoot({
    envFilePath: '.env.development',
  }),
  UsersModule, 
  AuthModule, 
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MySQL_DB_HOST,
    port: Number.parseInt(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    entities: [User, Profile, Property, Amenities],
    synchronize: true,
}), ProfileModule, PropertyModule, AmenitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
