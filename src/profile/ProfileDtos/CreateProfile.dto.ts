import { IsDate, IsDateString, IsEnum, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";
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

    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    dob: string;

    @IsJSON()
    @IsNotEmpty()
    @IsOptional()
    socialMediaHandles: string[];

    @IsEnum(Role)
    role: Role;

}