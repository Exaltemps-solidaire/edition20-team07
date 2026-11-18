// Règle de suggestion du coach (itération 5) : niveau + thématique → module du catalogue,
// toujours pas d'appel à un modèle de langage — testable sans backend.

import { modulePourNiveau, type Module, type Thematique } from "./modules";

export type { Thematique };

export type Niveau = 1 | 2 | 3 | 4 | 5;

export const NIVEAUX: { valeur: Niveau; libelle: string }[] = [
  { valeur: 1, libelle: "Équilibre" },
  { valeur: 2, libelle: "Vigilance" },
  { valeur: 3, libelle: "Sous pression" },
  { valeur: 4, libelle: "En difficulté" },
  { valeur: 5, libelle: "Épuisement" },
];

export type Suggestion = { module: string; texte: string };

export function suggererModule(niveau: Niveau, thematique: Thematique): Module {
  return modulePourNiveau(thematique, niveau);
}

export function suggestionDepuisModule(moduleSuggere: Module): Suggestion {
  return { module: moduleSuggere.titre, texte: `${moduleSuggere.description} (${moduleSuggere.duree})` };
}
