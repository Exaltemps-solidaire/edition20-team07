import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis qui je suis", async () => {
    await expect(page.getByRole("heading", { name: "Qui êtes-vous ?" })).toBeVisible();
    await page.getByRole("button", { name: /Julie/ }).click();
  });

  await test.step("Je vois mon tableau de bord avec ma reprise mémorisée", async () => {
    await expect(page.getByRole("heading", { name: "Bonjour Julie," })).toBeVisible();
    await expect(page.getByText("Retrouver de l'énergie en douceur")).toBeVisible();
  });

  await test.step("Je clique sur « Reprendre » et ma position avance", async () => {
    const minuteAvant = await page.locator("strong").nth(1).innerText();
    await page.getByRole("button", { name: "Reprendre exactement là où je me suis arrêtée" }).click();
    await expect(page.locator("strong").nth(1)).not.toHaveText(minuteAvant);
  });

  await test.step("Après un rechargement, ma nouvelle position est toujours là", async () => {
    const minuteApresClic = await page.locator("strong").nth(1).innerText();
    await page.reload();
    await expect(page.locator("strong").nth(1)).toHaveText(minuteApresClic);
  });
});
