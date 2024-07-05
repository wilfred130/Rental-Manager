// src/property/location.entity.ts
import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
  
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
