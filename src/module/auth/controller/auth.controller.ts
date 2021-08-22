import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commom/decorators/user.decorator';
import { Usuario } from 'src/entity/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService:AuthService
    ){}
//el authguard utiliza primero el metodo de la estrategia
@UseGuards(LocalAuthGuard)
@Post('login')
async login(
    @Body() LoginDto:LoginDto,
    @User() user:Usuario
){
    const data= await this.AuthService.login(user)
    return{message:'login Exitoso',data}
}
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Get('profile')
profile(@User() user:Usuario){
    return { message:'Se encontro Usuario',user}
}
@UseGuards(JwtAuthGuard)
//actualizar el token
@Get('refresh')
@ApiBearerAuth()
refreshtoken(@User() user:Usuario){
 const data=  this.AuthService.login(user)
    return{message:'refresh Token',data}
}
}
