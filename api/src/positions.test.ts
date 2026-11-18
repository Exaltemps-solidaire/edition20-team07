import { describe, expect, it } from "vitest";
import { avancerPosition, lirePosition, progresser } from "./positions.ts";

describe("progresser", () => {
  it("avance la minute vidéo d'une unité sans changer le reste", () => {
    const suivante = progresser({ module: "Test", minuteVideo: 5, etapeQuiz: 1, etapesQuizTotal: 3 });
    expect(suivante).toEqual({ module: "Test", minuteVideo: 6, etapeQuiz: 1, etapesQuizTotal: 3 });
  });
});

describe("lirePosition / avancerPosition", () => {
  it("persiste l'avancée : une lecture après « Reprendre » renvoie la nouvelle position", () => {
    const avant = lirePosition("amel");
    const apres = avancerPosition("amel");
    expect(apres?.minuteVideo).toBe((avant?.minuteVideo ?? 0) + 1);
    expect(lirePosition("amel")).toEqual(apres);
  });

  it("renvoie undefined pour un persona inconnu", () => {
    expect(lirePosition("inconnu")).toBeUndefined();
    expect(avancerPosition("inconnu")).toBeUndefined();
  });
});
