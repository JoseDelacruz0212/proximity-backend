import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emailUsuario?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passwordUsuario?: string;
}