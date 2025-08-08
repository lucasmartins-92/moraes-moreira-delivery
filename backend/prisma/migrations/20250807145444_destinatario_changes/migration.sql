/*
  Warnings:

  - You are about to drop the column `destinatarioId` on the `Carta` table. All the data in the column will be lost.
  - Added the required column `nomeDestinatario` to the `Carta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "nomeDestinatario" TEXT NOT NULL,
    "enderecoDestinatario" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NA_FILA',
    "observacao" TEXT,
    "criada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizada" DATETIME NOT NULL,
    "remetenteId" INTEGER NOT NULL,
    "pomboId" INTEGER NOT NULL,
    CONSTRAINT "Carta_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carta_pomboId_fkey" FOREIGN KEY ("pomboId") REFERENCES "Pombo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Carta" ("atualizada", "conteudo", "criada", "enderecoDestinatario", "id", "observacao", "pomboId", "remetenteId", "status") SELECT "atualizada", "conteudo", "criada", "enderecoDestinatario", "id", "observacao", "pomboId", "remetenteId", "status" FROM "Carta";
DROP TABLE "Carta";
ALTER TABLE "new_Carta" RENAME TO "Carta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
