import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePomboDto } from './dto/create-pombo.dto';
import { UpdatePomboDto } from './dto/update-pombo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PombosService {
  constructor(private prisma: PrismaService) {}

  create(createPomboDto: CreatePomboDto) {
    return this.prisma.pombo.create({
      data: createPomboDto,
    });
  }

  findAll() {
    return this.prisma.pombo.findMany();
  }

  findOne(id: number) {
    return this.prisma.pombo.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePomboDto: UpdatePomboDto) {
    return this.prisma.pombo.update({
      where: { id },
      data: updatePomboDto,
    });
  }

  remove(id: number) {
    return this.prisma.pombo.delete({
      where: { id },
    });
  }

  async aposentar(id: number) {
    const pombo = await this.prisma.pombo.findUnique({ where: { id } });
    if (!pombo) {
      throw new NotFoundException(`Pombo com ID ${id} não encontrado.`);
    }

    return this.prisma.pombo.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async desaposentar(id: number) {
    const pombo = await this.prisma.pombo.findUnique({ where: { id } });
    if (!pombo) {
      throw new NotFoundException(`Pombo com ID ${id} não encontrado.`);
    }

    return this.prisma.pombo.update({
      where: { id },
      data: { ativo: true },
    });
  }
}
