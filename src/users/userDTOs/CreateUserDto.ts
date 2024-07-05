import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Validate, } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}