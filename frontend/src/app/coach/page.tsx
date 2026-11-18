"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { suggerer, type Etat, type Suggestion } from "@/lib/coach";
import styles from "./page.module.css";

export const CLE_SUGGESTION = "lburn.suggestion";

const QUESTIONS: { etat: Etat; libelle: string }[] = [
  { etat: "difficile", libelle: "Ça ne va pas" },
  { etat: "ca-va", libelle: "Ça va" },
  { etat: "en-forme", libelle: "En pleine forme" },
];

export default function Coach() {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  function suivre() {
    if (!suggestion) return;
    window.sessionStorage.setItem(CLE_SUGGESTION, JSON.stringify(suggestion));
    router.push("/tableau-de-bord");
  }

  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        <h1>Comment vous sentez-vous aujourd&apos;hui ?</h1>
        {!suggestion ? (
          <div className={styles.reponses}>
            {QUESTIONS.map((question) => (
              <button key={question.etat} type="button" onClick={() => setSuggestion(suggerer(question.etat))}>
                {question.libelle}
              </button>
            ))}
          </div>
        ) : (
          <>
            <p>{suggestion.texte}</p>
            <button type="button" className={styles.suivre} onClick={suivre}>
              Suivre : {suggestion.module}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
