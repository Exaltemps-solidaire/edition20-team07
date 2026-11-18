"use client";

import { useRouter } from "next/navigation";
import { CLE_PERSONA } from "../page";
import { getPersonaById } from "@/lib/personas";
import styles from "./page.module.css";

export default function TableauDeBord() {
  const router = useRouter();
  // Rendu uniquement côté client (export statique) : pas de persona avant hydratation.
  const personaId = typeof window === "undefined" ? null : window.localStorage.getItem(CLE_PERSONA);
  const persona = getPersonaById(personaId);

  function changerDePersona() {
    window.localStorage.removeItem(CLE_PERSONA);
    router.push("/");
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

  const { position } = persona;

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
        <p>
          Vous étiez sur le module <strong>{position.module}</strong>, à la minute{" "}
          <strong>{position.minuteVideo}</strong> de la vidéo, et à l&apos;étape{" "}
          <strong>
            {position.etapeQuiz} / {position.etapesQuizTotal}
          </strong>{" "}
          du quiz.
        </p>
        <button type="button" className={styles.reprendre}>
          Reprendre exactement là où je me suis arrêtée
        </button>
      </section>
    </main>
  );
}
