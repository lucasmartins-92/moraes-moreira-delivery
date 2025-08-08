-- CreateTable
CREATE TABLE "Pombo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apelido" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "velocidadeMedia" REAL NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Carta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "enderecoDestinatario" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NA_FILA',
    "observacao" TEXT,
    "criada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizada" DATETIME NOT NULL,
    "remetenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "pomboId" INTEGER NOT NULL,
    CONSTRAINT "Carta_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carta_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carta_pomboId_fkey" FOREIGN KEY ("pomboId") REFERENCES "Pombo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pombo_apelido_key" ON "Pombo"("apelido");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
