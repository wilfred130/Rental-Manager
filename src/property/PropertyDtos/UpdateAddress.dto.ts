// src/property/address.entity.ts

import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateAddresDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    streetAddress: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    city: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    state: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    postal: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    zipcode: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    country: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    addressLine: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    neighborhood: string;
}
