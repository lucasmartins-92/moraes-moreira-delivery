import { IsString, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsDateString()
    dataNascimento: Date;

    @IsString()
    @IsNotEmpty()
    endereco: string;
}