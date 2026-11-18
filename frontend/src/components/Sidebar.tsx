"use client";

import Link from "next/link";
import { CLE_PERSONA } from "@/app/page";
import styles from "./Sidebar.module.css";

const RUBRIQUES = [
  { href: "/tableau-de-bord", libelle: "Mon espace" },
  { href: "/coach", libelle: "Mon parcours" },
  { href: "/ressources", libelle: "Mes ressources" },
  { href: "/reseau", libelle: "Mon réseau" },
  { href: "/echanges", libelle: "Mes échanges" },
  { href: "/rendez-vous", libelle: "Mes rendez-vous" },
];

export default function Sidebar() {
  const personaId = typeof window === "undefined" ? null : window.localStorage.getItem(CLE_PERSONA);
  if (!personaId) return null;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {RUBRIQUES.map((rubrique) => (
          <Link key={rubrique.href} href={rubrique.href} className={styles.lien}>
            {rubrique.libelle}
          </Link>
        ))}
      </nav>
      <div className={styles.soutien}>
        <p className={styles.phrase}>Vous n&apos;êtes pas seule</p>
        <p className={styles.assistance}>Besoin d&apos;aide ? Contactez l&apos;association.</p>
      </div>
    </aside>
  );
}
