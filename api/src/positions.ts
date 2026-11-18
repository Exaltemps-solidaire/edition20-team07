// Stockage en mémoire des positions par persona (itération 2) : pas de base de données imposée à ce stade.
// Les valeurs initiales reprennent les données en dur de l'itération 1 (frontend/src/lib/personas.ts).

export type Position = {
  module: string;
  minuteVideo: number;
  etapeQuiz: number;
  etapesQuizTotal: number;
};

const POSITIONS_INITIALES: Record<string, Position> = {
  julie: { module: "Retrouver de l'énergie en douceur", minuteVideo: 7, etapeQuiz: 2, etapesQuizTotal: 5 },
  amel: { module: "Réévaluer vos priorités", minuteVideo: 0, etapeQuiz: 1, etapesQuizTotal: 4 },
};

const positions = new Map<string, Position>(Object.entries(POSITIONS_INITIALES));

export function lirePosition(persona: string): Position | undefined {
  return positions.get(persona);
}

// Logique métier pure et testable : simule l'avancée déclenchée par « Reprendre ».
export function progresser(position: Position): Position {
  return { ...position, minuteVideo: position.minuteVideo + 1 };
}

export function avancerPosition(persona: string): Position | undefined {
  const actuelle = positions.get(persona);
  if (!actuelle) return undefined;
  const suivante = progresser(actuelle);
  positions.set(persona, suivante);
  return suivante;
}
