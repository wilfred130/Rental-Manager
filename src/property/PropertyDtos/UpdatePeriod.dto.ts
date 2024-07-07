import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePeriodDto {
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    length: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    Duration: string;
}
