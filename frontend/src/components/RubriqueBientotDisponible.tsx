import styles from "./RubriqueBientotDisponible.module.css";

export function RubriqueBientotDisponible({ titre }: { titre: string }) {
  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        <h1>{titre}</h1>
        <p>Bientôt disponible.</p>
      </div>
    </main>
  );
}
