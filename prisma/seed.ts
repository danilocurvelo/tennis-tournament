import { PrismaClient, Round } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create 128 players with mock data
  const players = [] as { id: number }[];
  for (let i = 1; i <= 128; i++) {
    const player = await prisma.player.create({
      data: {
        name: `Player ${i}`,
        country: `Country ${i}`,
        ranking: i,
      },
    });
    players.push(player);
  }

  // create a single tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: 'Mock Championship',
      year: 2024,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-14'),
      location: 'Test Arena',
    },
  });

  // create 64 matches for the first round (1 vs 128, 2 vs 127, ...)
  for (let i = 0; i < 64; i++) {
    await prisma.match.create({
      data: {
        tournamentId: tournament.id,
        round: Round.FIRST_ROUND,
        player1Id: players[i].id,
        player2Id: players[127 - i].id,
        matchDate: new Date('2024-01-02'),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
