import { IsDate, IsEnum, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "src/Typeorm/Entities/Roles.enum";

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    profileImage: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    physicalAddress: string;

    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    dob: Date;

    @IsJSON()
    @IsNotEmpty()
    @IsOptional()
    socialMediaHandles: string[];

    @IsEnum(Role)
    role: Role;

}