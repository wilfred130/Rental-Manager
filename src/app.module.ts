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

@Module({
  imports: [
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
    entities: [User, Profile, Property],
    synchronize: true,
}), ProfileModule, PropertyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
