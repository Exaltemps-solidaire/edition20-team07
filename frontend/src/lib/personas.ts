// Données d'exemple pour l'itération 1 : pas de connexion, on choisit un persona dans une liste.
// Depuis l'itération 2, la position (module/minute/étape) n'est plus ici : elle vient de l'API
// (voir api/src/positions.ts), seule source de vérité pour qu'elle survive à un rechargement.
export type Persona = {
  id: string;
  nom: string;
  role: string;
  stade: number;
  stadeLibelle: string;
  thematique: string;
};

export const PERSONAS: Persona[] = [
  {
    id: "julie",
    nom: "Julie",
    role: "BURN'ette en reconstruction",
    stade: 3,
    stadeLibelle: "Sous pression",
    thematique: "En reconstruction",
  },
  {
    id: "amel",
    nom: "Amel",
    role: "BURN'ette en remobilisation",
    stade: 2,
    stadeLibelle: "Vigilante",
    thematique: "En remobilisation",
  },
];

export function getPersonaById(id: string | null | undefined): Persona | undefined {
  return PERSONAS.find((persona) => persona.id === id);
}
