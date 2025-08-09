import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PombosService } from './pombos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePomboDto } from './dto/create-pombo.dto';
import { UpdatePomboDto } from './dto/update-pombo.dto';

export const storageOptions = {
  storage: diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

@Controller('pombos')
export class PombosController {
  constructor(private readonly pombosService: PombosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('foto', storageOptions))
  create(
    @Body() createPomboDto: CreatePomboDto,
    @UploadedFile() foto?: Express.Multer.File,
  ) {
    return this.pombosService.create(createPomboDto, foto);
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