import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const pageTitle = await page.textContent("h1");
  expect(pageTitle).toBe("Pixar movies");
});

test("has movie cards", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".card");

  const movieCards = await page.$$(".card");
  expect(movieCards.length).toBeGreaterThan(0);
});

test("opens popup when clicking on movie card", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".card");

  const movieCards = await page.$$(".card");
  await movieCards[0].click();
  const popup = await page.waitForSelector(".popup", { state: "visible" });
  expect(popup).toBeTruthy();
});

test("check info in popup", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".card");
  
  const movieCards = await page.$$(".card");
  await movieCards[0].click();
  
  const popup = await page.waitForSelector(".popup", { state: "visible" });

  const movieTitleElement = await popup.$(".popup-info h2");
  const movieTitle = movieTitleElement ? await movieTitleElement.textContent() : null;
  expect(movieTitle).toContain("Toy Story"); 

  const ratingElement = await popup.$(".popup-info p:nth-child(2)");
  const ratingText = ratingElement ? await ratingElement.textContent() : null;
  expect(ratingText).toContain("Rating: 8.3");
});