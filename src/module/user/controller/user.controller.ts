
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
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
@ApiTags('User routes')
@Controller('usuario')
export class UserController {
    constructor(private readonly usuarioService: UserService) {}
  
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUserDto) {
      return await this.usuarioService.update(id, dto);
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.usuarioService.delete(id);
    }

}
