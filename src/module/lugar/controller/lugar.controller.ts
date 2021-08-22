import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Delete,
    UseGuards,
  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { LugarDto } from '../dtos/lugar.dto';
import { LugarService } from '../services/lugar.service';
@ApiTags('Lugar routes')
@Controller('lugar')
export class LugarController {
    constructor(private readonly lugarService: LugarService) {}

    @Get()
    async gettAll() {
      return this.lugarService.getAll();
    }
  
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
      return await this.lugarService.findById(id);
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(@Body() dto: LugarDto) {
      return await this.lugarService.create(dto);
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: LugarDto) {
      return await this.lugarService.update(id, dto);
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.lugarService.delete(id);
    }

}
