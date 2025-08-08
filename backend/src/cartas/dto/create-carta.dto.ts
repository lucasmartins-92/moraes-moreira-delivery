import { IsInt, IsNotEmpty, IsString } from 'class-validator';


export class CreateCartaDto {
    @IsString()
    @IsNotEmpty()
    conteudo: string;

    @IsString()
    @IsNotEmpty()
    nomeDestinatario: string;

    @IsString()
    @IsNotEmpty()
    enderecoDestinatario: string;

    @IsInt()
    @IsNotEmpty()
    remetenteId: number;

    @IsInt()
    @IsNotEmpty()
    pomboId: number;
}
