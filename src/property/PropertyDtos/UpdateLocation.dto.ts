// src/property/location.entity.ts
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


export class UpdateLocationDto {
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}
