// src/property/address.entity.ts

import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    streetAddress: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    postal: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    zipcode: string;

    @IsNotEmpty()
    @IsString()
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
