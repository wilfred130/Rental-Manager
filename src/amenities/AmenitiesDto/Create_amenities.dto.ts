import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAmenitiesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  images: string[];
}
