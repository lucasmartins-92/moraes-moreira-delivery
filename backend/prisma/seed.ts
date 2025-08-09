import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding...');

  await prisma.carta.deleteMany({});
  await prisma.cliente.deleteMany({});
  await prisma.pombo.deleteMany({});
  console.log('Banco de dados limpo.');

  await prisma.pombo.createMany({
    data: [
      { apelido: 'Asa Branca', velocidadeMedia: 70, ativo: true },
      { apelido: 'Relâmpago', velocidadeMedia: 85.5, ativo: true },
      { apelido: 'Trovão', velocidadeMedia: 62, ativo: true },
      { apelido: 'Gentileza', velocidadeMedia: 55, ativo: false },
    ],
  });
  console.log('Pombos cadastrados.');

  await prisma.cliente.createMany({
    data: [
      { nome: 'Romeu Montéquio', email: 'romeu@verona.it', dataNascimento: new Date('1578-03-15T00:00:00.000Z'), endereco: 'Piazza delle Erbe, Verona' },
      { nome: 'Julieta Capuleto', email: 'julieta@verona.it', dataNascimento: new Date('1580-07-22T00:00:00.000Z'), endereco: 'Via Cappello, 23, Verona' },
      { nome: 'Sr. Moraes Moreira', email: 'moraes@mpb.com.br', dataNascimento: new Date('1947-10-21T00:00:00.000Z'), endereco: 'Brasil' },
    ],
  });
  console.log('Clientes cadastrados.');

  const pombos = await prisma.pombo.findMany();
  const clientes = await prisma.cliente.findMany();

  await prisma.carta.create({
    data: {
      conteudo: 'Oh, Romeu, Romeu! Onde estás, Romeu?',
      nomeDestinatario: 'Romeu Montéquio',
      enderecoDestinatario: 'Piazza delle Erbe, Verona',
      remetenteId: clientes.find(c => c.nome === 'Julieta Capuleto')!.id,
      pomboId: pombos.find(p => p.apelido === 'Asa Branca')!.id,
      status: 'ENTREGUE'
    }
  });

  await prisma.carta.create({
    data: {
      conteudo: 'Minha Julieta, a mais bela das flores.',
      nomeDestinatario: 'Julieta Capuleto',
      enderecoDestinatario: 'Via Cappello, 23, Verona',
      remetenteId: clientes.find(c => c.nome === 'Romeu Montéquio')!.id,
      pomboId: pombos.find(p => p.apelido === 'Relâmpago')!.id,
      status: 'ENVIADO'
    }
  });

  await prisma.carta.create({
    data: {
      conteudo: 'Lá vem o Brasil descendo a ladeira...',
      nomeDestinatario: 'Brasil',
      enderecoDestinatario: 'Brasil',
      remetenteId: clientes.find(c => c.nome === 'Sr. Moraes Moreira')!.id,
      pomboId: pombos.find(p => p.apelido === 'Trovão')!.id,
      status: 'NA_FILA'
    }
  });
  console.log('Cartas cadastradas.');

  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });