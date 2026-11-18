"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLE_PERSONA } from "../page";
import { getPersonaById } from "@/lib/personas";
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
        <button type="button" className={styles.changer} onClick={changerDePersona}>
          Changer de persona
        </button>
      </header>

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
