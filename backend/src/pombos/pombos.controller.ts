import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PombosService } from './pombos.service';
import { CreatePomboDto } from './dto/create-pombo.dto';
import { UpdatePomboDto } from './dto/update-pombo.dto';

@Controller('pombos')
export class PombosController {
  constructor(private readonly pombosService: PombosService) {}

  @Post()
  create(@Body() createPomboDto: CreatePomboDto) {
    return this.pombosService.create(createPomboDto);
  }

  @Get()
  findAll() {
    return this.pombosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pombosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePomboDto: UpdatePomboDto) {
    return this.pombosService.update(+id, updatePomboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pombosService.remove(+id);
  }

  @Patch(':id/aposentar')
  aposentar(@Param('id') id: string) {
    return this.pombosService.aposentar(+id);
  }

  @Patch(':id/desaposentar')
  desaposentar(@Param('id') id: string) {
    return this.pombosService.desaposentar(+id);
  }
}