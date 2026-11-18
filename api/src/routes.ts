// Routage de l'API, sans dépendance : une fonction pure, testable sans démarrer de serveur.
// Le proxy d'entrée envoie /api/... à ce service sans retirer le préfixe : les routes métier
// se déclarent donc sous /api/v1/... ; /health et /sante restent à la racine (port 8081).
import { avancerPosition, lirePosition } from "./positions.ts";

export type Reponse = { statut: number; corps?: unknown };

export function router(methode: string, url: string): Reponse {
  const chemin = new URL(url, "http://api").pathname;
  if (methode === "GET" && (chemin === "/health" || chemin === "/sante")) {
    return { statut: 200, corps: { status: "ok" } };
  }

  const positionDemandee = chemin.match(/^\/api\/v1\/positions\/([^/]+)$/);
  if (positionDemandee) {
    const persona = positionDemandee[1];
    if (methode === "GET") {
      const position = lirePosition(persona);
      return position ? { statut: 200, corps: position } : { statut: 404 };
    }
    if (methode === "POST") {
      const position = avancerPosition(persona);
      return position ? { statut: 200, corps: position } : { statut: 404 };
    }
  }

  return { statut: 404 };
}
