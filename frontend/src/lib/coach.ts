// Règle de suggestion du coach (itération 3) : pas d'appel à un modèle de langage,
// une orientation simple selon l'état choisi — testable sans backend.

export type Etat = "difficile" | "ca-va" | "en-forme";

export type Suggestion = { module: string; texte: string };

const SUGGESTIONS: Record<Etat, Suggestion> = {
  difficile: {
    module: "Respiration et ancrage (3 min)",
    texte: "Un moment difficile ? Une courte pause avant de reprendre, en douceur.",
  },
  "ca-va": {
    module: "Je continue mon module en cours",
    texte: "Pas besoin de changer de cap : on reprend là où vous en étiez.",
  },
  "en-forme": {
    module: "Réévaluer vos priorités",
    texte: "Vous semblez en forme : un module un peu plus exigeant pour avancer.",
  },
};

export function suggerer(etat: Etat): Suggestion {
  return SUGGESTIONS[etat];
}
