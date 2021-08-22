import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Delete,
    Put,
    UseGuards,
    
  } from '@nestjs/common';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from 'nest-access-control';
import { AppResource, roles } from 'src/app.roles';
import { Auth } from 'src/commom/decorators/auth.decarator';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { LugarDto } from '../dtos/lugar.dto';
import { LugarService } from '../services/lugar.service';
@ApiTags('Lugar routes')
@Controller('lugar')
export class LugarController {
    constructor(private readonly lugarService: LugarService,
    @InjectRolesBuilder()
    private readonly roleBuilder: RolesBuilder) {}

    @Get()
    async gettAll() {
      return this.lugarService.getAll();
    }
  
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
      return await this.lugarService.findById(id);
    }
  
    @Post()
    async create(@Body() dto: LugarDto) {
      return await this.lugarService.create(dto);
    }
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: LugarDto) {
      return await this.lugarService.update(id, dto);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.lugarService.delete(id);
    }

}
