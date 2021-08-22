
import { Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Delete,
    Body,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/commom/decorators/auth.decarator';
import { User } from 'src/commom/decorators/user.decorator';
import { Usuario } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User routes')
@Controller('usuario')
export class UserController {
    constructor(private readonly usuarioService: UserService,
      @InjectRolesBuilder()
      private readonly rolesBuilder:RolesBuilder
      ) {}
  
    @Get()
    async gettAll() {
      return this.usuarioService.getAll();
    }
  
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
      return await this.usuarioService.findById(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
      return await this.usuarioService.create(dto);
    }
    @Auth(
      {
        possession:'own',
        action:'update',
        resource: AppResource.User 
      }
    )
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number,
     @Body() dto: CreateUserDto,
     @User() user: Usuario) 
    {
      let data;
      //esto es admin
      if(this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted)
      {
        console.log('este es admin')
         data=await this.usuarioService.update(id, dto);
      }
      //usuario
      else
      {
        console.log('este es usuario')
        const { roles, ...rest } = dto;
         data=await this.usuarioService.update(id, rest, user);
      }
      return {message:'Editado',data}
    }
    @Auth({
        possession:'own',
        action:'delete',
        resource: AppResource.User 
      })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number,
     @User() user: Usuario) {
      let data;

      if (this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted) {
        // esto es un admin
        data = await this.usuarioService.delete(id);
      } else {
        // esto es un usuario
        data = await this.usuarioService.delete(id, user);
      }
      return { message: 'User deleted', data };
    }

}
