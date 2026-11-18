"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLE_PERSONA } from "../page";
import { CLE_SUGGESTION } from "../coach/page";
import { getPersonaById } from "@/lib/personas";
import type { Suggestion } from "@/lib/coach";
import styles from "./page.module.css";

type Position = {
  module: string;
  minuteVideo: number;
  etapeQuiz: number;
  etapesQuizTotal: number;
};

export default function TableauDeBord() {
  const router = useRouter();
  // Rendu uniquement côté client (export statique) : pas de persona avant hydratation.
  const personaId = typeof window === "undefined" ? null : window.localStorage.getItem(CLE_PERSONA);
  const persona = getPersonaById(personaId);
  const [position, setPosition] = useState<Position | null>(null);
  // Suggestion du coach suivie, le cas échéant : lue directement au rendu, comme le persona.
  const suggestionBrute = typeof window === "undefined" ? null : window.sessionStorage.getItem(CLE_SUGGESTION);
  const suggestionSuivie: Suggestion | null = suggestionBrute ? JSON.parse(suggestionBrute) : null;

  useEffect(() => {
    if (!persona) return;
    fetch(`/api/v1/positions/${persona.id}`)
      .then((reponse) => (reponse.ok ? reponse.json() : null))
      .then(setPosition);
  }, [persona]);

  function changerDePersona() {
    window.localStorage.removeItem(CLE_PERSONA);
    router.push("/");
  }

  async function reprendre() {
    if (!persona) return;
    const reponse = await fetch(`/api/v1/positions/${persona.id}`, { method: "POST" });
    if (reponse.ok) {
      setPosition(await reponse.json());
    }
  }

  if (!persona) {
    return (
      <main className={styles.page}>
        <p>Aucun persona choisi.</p>
        <button type="button" onClick={changerDePersona}>
          Choisir qui je suis
        </button>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.entete}>
        <div>
          <h1>Bonjour {persona.nom},</h1>
          <p>{persona.role}</p>
        </div>
        <div className={styles.actionsEntete}>
          <button type="button" className={styles.changer} onClick={() => router.push("/coach")}>
            Parler au coach
          </button>
          <button type="button" className={styles.changer} onClick={changerDePersona}>
            Changer de persona
          </button>
        </div>
      </header>

      {suggestionSuivie && (
        <section className={styles.carte}>
          <h2>Suggestion du coach suivie</h2>
          <p>
            <strong>{suggestionSuivie.module}</strong>
          </p>
          <p>{suggestionSuivie.texte}</p>
        </section>
      )}

      <section className={styles.carte}>
        <h2>Mon stade de burn-out</h2>
        <p className={styles.stade}>
          Stade {persona.stade} · {persona.stadeLibelle}
        </p>
        <p className={styles.thematique}>Thématique actuelle : {persona.thematique}</p>
      </section>

      <section className={styles.carte}>
        <h2>Ma reprise</h2>
        {position ? (
          <>
            <p>
              Vous étiez sur le module <strong>{position.module}</strong>, à la minute{" "}
              <strong>{position.minuteVideo}</strong> de la vidéo, et à l&apos;étape{" "}
              <strong>
                {position.etapeQuiz} / {position.etapesQuizTotal}
              </strong>{" "}
              du quiz.
            </p>
            <button type="button" className={styles.reprendre} onClick={reprendre}>
              Reprendre exactement là où je me suis arrêtée
            </button>
          </>
        ) : (
          <p>Chargement de votre reprise…</p>
        )}
      </section>
    </main>
  );
}
