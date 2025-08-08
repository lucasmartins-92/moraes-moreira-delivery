import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) { }

  create(createClienteDto: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  findAll() {
    return this.prisma.cliente.findMany();
  }

  findOne(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const carta = await this.prisma.carta.findUnique({
      where: { id },
    });

    if (!carta) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada.`);
    }

    if (carta.status === 'ENTREGUE') {
      throw new ForbiddenException('Não é possível alterar o status de uma carta já entregue.');
    }

    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  remove(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
