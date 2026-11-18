import { describe, expect, test } from "vitest";
import { suggererModule } from "./coach";

describe("suggererModule", () => {
  test("retourne un module de la thématique demandée", () => {
    const resultat = suggererModule(3, "reconstruction");
    expect(resultat.thematique).toBe("reconstruction");
  });

  test("deux niveaux différents proposent des modules différents dans une même thématique", () => {
    const a = suggererModule(1, "reconstruction");
    const b = suggererModule(2, "reconstruction");
    expect(a.titre).not.toBe(b.titre);
  });

  test("les deux thématiques proposent des modules distincts", () => {
    const a = suggererModule(3, "reconstruction");
    const b = suggererModule(3, "remobilisation");
    expect(a.titre).not.toBe(b.titre);
    expect(a.thematique).not.toBe(b.thematique);
  });
});
