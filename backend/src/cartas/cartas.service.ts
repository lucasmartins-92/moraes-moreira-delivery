import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartasService {
  constructor(private prisma: PrismaService) { }

  async create(createCartaDto: CreateCartaDto) {
    const pomboEscolhido = await this.prisma.pombo.findUnique({
      where: { id: createCartaDto.pomboId },
    });

    if (!pomboEscolhido || !pomboEscolhido.ativo) {
      throw new BadRequestException('O pombo escolhido não está disponível para entregas.');
    }

    return this.prisma.carta.create({
      data: createCartaDto,
    });
  }

  findAll() {
    return this.prisma.carta.findMany();
  }

  findOne(id: number) {
    return this.prisma.carta.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCartaDto: UpdateCartaDto) {
    const carta = await this.prisma.carta.findUnique({
      where: { id },
    });

    if (!carta) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada.`);
    }

    if (carta.status === 'ENTREGUE') {
      throw new ForbiddenException('Não é possível alterar o status de uma carta já entregue.');
    }
    return this.prisma.carta.update({
      where: { id },
      data: updateCartaDto,
    });
  }

  remove(id: number) {
    return this.prisma.carta.delete({
      where: { id },
    });
  }
}
