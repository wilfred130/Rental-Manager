import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePeriodDto {
    @IsNumber()
    @IsNotEmpty()
    length: number;

    @IsString()
    @IsNotEmpty()
    typeOfPeriod: string;
}
