// Catalogue de modules fictifs par thématique (itération 5, amelioration.md point 4).
// Données volontairement en dur : pas de backend de contenu à ce stade.

export type Thematique = "reconstruction" | "remobilisation";

export type Module = {
  icone: string;
  titre: string;
  description: string;
  duree: string;
  thematique: Thematique;
};

const CATALOGUE: Record<Thematique, Module[]> = {
  reconstruction: [
    {
      icone: "🌱",
      titre: "Retrouver de l'énergie en douceur",
      description: "Des exercices courts pour recharger sans se brusquer.",
      duree: "10 min",
      thematique: "reconstruction",
    },
    {
      icone: "💬",
      titre: "Apprendre à gérer ses émotions",
      description: "Des outils simples pour accueillir ce qui se joue en vous.",
      duree: "15 min",
      thematique: "reconstruction",
    },
    {
      icone: "🪞",
      titre: "Reconstruire son estime de soi",
      description: "Un parcours guidé pour renouer avec sa propre valeur.",
      duree: "12 min",
      thematique: "reconstruction",
    },
    {
      icone: "🧭",
      titre: "Apprendre à identifier ses limites",
      description: "Repérer ses signaux avant qu'ils ne deviennent des alertes.",
      duree: "8 min",
      thematique: "reconstruction",
    },
  ],
  remobilisation: [
    {
      icone: "✨",
      titre: "Retrouver confiance en soi",
      description: "Des exercices pour se réapproprier ses compétences.",
      duree: "10 min",
      thematique: "remobilisation",
    },
    {
      icone: "🎯",
      titre: "Identifier ses envies et ses aspirations",
      description: "Clarifier ce qui compte vraiment pour la suite.",
      duree: "12 min",
      thematique: "remobilisation",
    },
    {
      icone: "⚖️",
      titre: "Réévaluer ses priorités",
      description: "Remettre à plat ce qui mérite votre énergie.",
      duree: "10 min",
      thematique: "remobilisation",
    },
    {
      icone: "🚀",
      titre: "Préparer une reprise progressive d'activité",
      description: "Avancer par étapes, à un rythme qui vous ressemble.",
      duree: "15 min",
      thematique: "remobilisation",
    },
  ],
};

export function modulesPourThematique(thematique: Thematique): Module[] {
  return CATALOGUE[thematique];
}

export function modulePourNiveau(thematique: Thematique, niveau: number): Module {
  const modules = CATALOGUE[thematique];
  return modules[(niveau - 1) % modules.length];
}
