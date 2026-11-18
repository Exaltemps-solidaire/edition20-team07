// Données d'exemple pour l'itération 1 : pas de connexion, on choisit un persona dans une liste.
export type Persona = {
  id: string;
  nom: string;
  role: string;
  stade: number;
  stadeLibelle: string;
  thematique: string;
  position: {
    module: string;
    minuteVideo: number;
    etapeQuiz: number;
    etapesQuizTotal: number;
  };
};

export const PERSONAS: Persona[] = [
  {
    id: "julie",
    nom: "Julie",
    role: "BURN'ette en reconstruction",
    stade: 3,
    stadeLibelle: "Sous pression",
    thematique: "En reconstruction",
    position: {
      module: "Retrouver de l'énergie en douceur",
      minuteVideo: 7,
      etapeQuiz: 2,
      etapesQuizTotal: 5,
    },
  },
  {
    id: "amel",
    nom: "Amel",
    role: "BURN'ette en remobilisation",
    stade: 2,
    stadeLibelle: "Vigilante",
    thematique: "En remobilisation",
    position: {
      module: "Réévaluer vos priorités",
      minuteVideo: 0,
      etapeQuiz: 1,
      etapesQuizTotal: 4,
    },
  },
];

export function getPersonaById(id: string | null | undefined): Persona | undefined {
  return PERSONAS.find((persona) => persona.id === id);
}
