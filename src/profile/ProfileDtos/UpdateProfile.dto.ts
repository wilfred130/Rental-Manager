import { IsDate, IsDateString, IsEnum, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "src/Typeorm/Entities/Roles.enum";

export class UpdateProfileDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
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
    @IsOptional()
    role: Role;

}