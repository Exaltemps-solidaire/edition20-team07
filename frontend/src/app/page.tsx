"use client";

import { useRouter } from "next/navigation";
import { PERSONAS } from "@/lib/personas";
import styles from "./page.module.css";

export const CLE_PERSONA = "lburn.personaId";

export default function QuiEtesVous() {
  const router = useRouter();

  function choisir(id: string) {
    window.localStorage.setItem(CLE_PERSONA, id);
    router.push("/tableau-de-bord");
  }

  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        <h1>Qui êtes-vous ?</h1>
        <p>Choisissez la personne que vous incarnez pour cette session.</p>
        <ul className={styles.personas}>
          {PERSONAS.map((persona) => (
            <li key={persona.id}>
              <button type="button" onClick={() => choisir(persona.id)}>
                <strong>{persona.nom}</strong>
                <span>{persona.role}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
