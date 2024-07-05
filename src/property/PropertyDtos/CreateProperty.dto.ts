// src/property/dto/create-property.dto.ts
import { IsArray, IsNotEmpty, IsNumber,  IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './CreateAddress.dto';
import { CreateLocationDto } from './CreateLocation.dto';
import { CreatePeriodDto } from './CreatePeriod.dto';



export class CreatePropertyDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location?: CreateLocationDto;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePeriodDto)
  period: CreatePeriodDto

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
