# Sahha (صحّة)

A local-first nutrition tracker made for Algeria. Log meals and track calories, protein, carbohydrates and fat using a catalogue of Algerian dishes and everyday foods. Available in French, Arabic (RTL) and English.

## Run locally

Requires Node.js 18 or newer.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Run `npm run build` to create a production build and `npm test` to run the calculation tests.

## Features and limitations

- Set up an adult profile for estimated daily targets, or set your own targets in Profile.
- Search the food catalogue, choose a portion and meal, and view your daily totals and seven-day trends. Add custom foods with values per 100 g.
- Your profile, food log and custom foods are stored in this browser's local storage; clearing browser data removes them. There is no account or synchronization.
- Food values and calorie targets are estimates, not medical advice. Recipes and portion sizes vary; check packaging or consult a qualified professional when precision matters. Daily target estimates use the Mifflin–St Jeor equation with an activity factor and are intended for adults.
