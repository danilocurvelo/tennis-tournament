import { Round } from '@prisma/client';
import { prisma } from '../../lib/prisma';

const roundOrder: Round[] = [
  Round.FIRST_ROUND,
  Round.SECOND_ROUND,
  Round.THIRD_ROUND,
  Round.FOURTH_ROUND,
  Round.QUARTERFINAL,
  Round.SEMIFINAL,
  Round.FINAL,
];

const roundLabels: Record<Round, string> = {
  [Round.FIRST_ROUND]: '1ª Rodada',
  [Round.SECOND_ROUND]: '2ª Rodada',
  [Round.THIRD_ROUND]: '3ª Rodada',
  [Round.FOURTH_ROUND]: '4ª Rodada',
  [Round.QUARTERFINAL]: 'Quartas',
  [Round.SEMIFINAL]: 'Semifinal',
  [Round.FINAL]: 'Final',
};

export default async function Bracket() {
  const matches = await prisma.match.findMany({
    include: {
      player1: true,
      player2: true,
      winner: true,
    },
    orderBy: { id: 'asc' },
  });

  const matchesByRound: Record<Round, typeof matches> = {
    [Round.FIRST_ROUND]: [],
    [Round.SECOND_ROUND]: [],
    [Round.THIRD_ROUND]: [],
    [Round.FOURTH_ROUND]: [],
    [Round.QUARTERFINAL]: [],
    [Round.SEMIFINAL]: [],
    [Round.FINAL]: [],
  };

  for (const match of matches) {
    matchesByRound[match.round].push(match);
  }

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4">
        {roundOrder.map((round) => (
          <div key={round} className="min-w-56">
            <h2 className="text-center font-semibold mb-4">
              {roundLabels[round]}
            </h2>
            <div className="space-y-4">
              {matchesByRound[round].map((m) => (
                <div
                  key={m.id}
                  className="bg-white border rounded p-2 shadow text-sm"
                >
                  <div className="font-medium">{m.player1.name}</div>
                  <div className="font-medium">{m.player2.name}</div>
                  {m.winner && (
                    <div className="text-green-600 mt-1">
                      Vencedor: {m.winner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
