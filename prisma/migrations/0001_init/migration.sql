-- Migration SQL for initial schema
CREATE TABLE "Player" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "country" TEXT,
  "ranking" INTEGER
);

CREATE TABLE "Tournament" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "startDate" DATETIME NOT NULL,
  "endDate" DATETIME NOT NULL,
  "location" TEXT
);

CREATE TABLE "Match" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "tournamentId" INTEGER NOT NULL,
  "round" TEXT NOT NULL,
  "player1Id" INTEGER NOT NULL,
  "player2Id" INTEGER NOT NULL,
  "winnerId" INTEGER,
  "matchDate" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  FOREIGN KEY ("tournamentId") REFERENCES "Tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY ("player1Id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY ("player2Id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY ("winnerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "Match_tournamentId_idx" ON "Match"("tournamentId");
CREATE INDEX "Match_player1Id_idx" ON "Match"("player1Id");
CREATE INDEX "Match_player2Id_idx" ON "Match"("player2Id");
CREATE INDEX "Match_winnerId_idx" ON "Match"("winnerId");
