import { PartialType } from '@nestjs/mapped-types';
import { CreateCartaDto } from './create-carta.dto';
import { IsEnum } from 'class-validator';
import { StatusCarta } from '@prisma/client';


export class UpdateCartaDto extends PartialType(CreateCartaDto) {
  @IsEnum(StatusCarta)
  status: StatusCarta;
}