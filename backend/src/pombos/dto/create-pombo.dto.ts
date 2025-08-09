import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePomboDto {
    @IsString()
    @IsNotEmpty()
    apelido: string;

    @IsNumber()
    @IsNotEmpty()
    velocidadeMedia: number;
}