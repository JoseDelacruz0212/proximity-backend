import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    idUsuario?: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombreUsuario?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    apellidoUsuario?: string;
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    emailUsuario?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passwordUsuario?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    estado:boolean;
    @ApiProperty()
    roles: string[];
}
