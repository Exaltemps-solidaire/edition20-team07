import { describe, expect, it } from "vitest";
import { getPersonaById } from "./personas";

describe("getPersonaById", () => {
  it("retrouve un persona existant par son id", () => {
    expect(getPersonaById("julie")?.nom).toBe("Julie");
  });

  it("renvoie undefined pour un id inconnu, vide ou absent", () => {
    expect(getPersonaById("inconnu")).toBeUndefined();
    expect(getPersonaById(null)).toBeUndefined();
    expect(getPersonaById(undefined)).toBeUndefined();
  });
});
