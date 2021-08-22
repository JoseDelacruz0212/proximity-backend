import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class LugarDto {
    idLugar?: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombreLugar?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    estadoLugar?: boolean;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    latitud?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    longitud?: string;
  }
  