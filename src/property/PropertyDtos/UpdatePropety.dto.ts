// src/property/dto/create-property.dto.ts
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddresDto } from './UpdateAddress.dto';
import { UpdateLocationDto } from './UpdateLocation.dto';
import { UpdatePeriodDto } from './UpdatePeriod.dto';


export class UpdatePropertyDto {
  @IsNotEmpty()
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateAddresDto)
  address: UpdateAddresDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  location?: UpdateLocationDto;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  type: string;

  @IsNotEmpty()
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdatePeriodDto)
  period: UpdatePeriodDto;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
