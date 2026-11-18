import { describe, expect, it } from "vitest";
import { suggerer } from "./coach";

describe("suggerer", () => {
  it("propose une pause quand l'état est difficile", () => {
    expect(suggerer("difficile").module).toBe("Respiration et ancrage (3 min)");
  });

  it("propose de continuer le module en cours quand ça va", () => {
    expect(suggerer("ca-va").module).toBe("Je continue mon module en cours");
  });

  it("propose un module plus exigeant quand on est en forme", () => {
    expect(suggerer("en-forme").module).toBe("Réévaluer vos priorités");
  });
});
