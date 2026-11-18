"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NIVEAUX, suggestionDepuisModule, suggererModule, type Niveau, type Thematique } from "@/lib/coach";
import styles from "./page.module.css";

export const CLE_SUGGESTION = "lburn.suggestion";

const THEMATIQUES: { valeur: Thematique; titre: string; description: string }[] = [
  {
    valeur: "reconstruction",
    titre: "En reconstruction",
    description: "Vous traversez une période de récupération après une période difficile.",
  },
  {
    valeur: "remobilisation",
    titre: "En remobilisation",
    description: "Vous retrouvez progressivement vos ressources et souhaitez reconstruire votre équilibre.",
  },
];

export default function Coach() {
  const router = useRouter();
  const [niveau, setNiveau] = useState<Niveau | null>(null);
  const [thematique, setThematique] = useState<Thematique | null>(null);

  const moduleSuggere = niveau && thematique ? suggererModule(niveau, thematique) : null;

  function suivre() {
    if (!moduleSuggere) return;
    window.sessionStorage.setItem(CLE_SUGGESTION, JSON.stringify(suggestionDepuisModule(moduleSuggere)));
    router.push("/tableau-de-bord");
  }

  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        <h1>Comment vous sentez-vous actuellement ?</h1>
        <p>Souhaitez-vous faire le point sur votre état de bien-être ?</p>

        <div className={styles.niveaux}>
          {NIVEAUX.map((n) => (
            <button
              key={n.valeur}
              type="button"
              className={n.valeur === niveau ? styles.niveauActif : styles.niveau}
              onClick={() => setNiveau(n.valeur)}
            >
              {n.libelle}
            </button>
          ))}
        </div>

        {niveau && (
          <div className={styles.message}>
            <p>
              Vous semblez vous situer au stade {niveau} : <strong>{NIVEAUX[niveau - 1].libelle}</strong>.
            </p>
            <p className={styles.disclaimer}>
              Cette échelle est un outil associatif de repérage et d&apos;orientation, pas un diagnostic médical.
            </p>
          </div>
        )}

        {niveau && (
          <div className={styles.thematiques}>
            <h2>Quelle thématique correspond à votre besoin actuel ?</h2>
            {THEMATIQUES.map((t) => (
              <button
                key={t.valeur}
                type="button"
                className={t.valeur === thematique ? styles.thematiqueActive : styles.thematiqueCarte}
                onClick={() => setThematique(t.valeur)}
              >
                <strong>{t.titre}</strong>
                <span>{t.description}</span>
              </button>
            ))}
          </div>
        )}

        {moduleSuggere && (
          <div className={styles.moduleCarte}>
            <span className={styles.icone}>{moduleSuggere.icone}</span>
            <h2>{moduleSuggere.titre}</h2>
            <p>{moduleSuggere.description}</p>
            <p className={styles.duree}>{moduleSuggere.duree}</p>
            <button type="button" className={styles.decouvrir} onClick={suivre}>
              Découvrir le module
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
