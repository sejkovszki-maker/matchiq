# MatchIQ v0.2 — Prediction Core

A MatchIQ sport-előrejelző projekt következő kiadása. A v0.2 fő célja, hogy a v0.1-ben megjelenített előrejelzések ne külön-külön statikus tesztértékek legyenek, hanem egy közös matematikai modellből származzanak.

## Modell
A `lib/prediction.ts` Poisson-eloszlással számolja a hazai és vendég gólszám valószínűségeit a megadott várható gólértékekből (xG). Az eredménymátrixból származik:
- 1X2
- BTTS
- Over 1.5
- Over 2.5
- Over 3.5
- legvalószínűbb pontos eredmény
- top pontos eredmények
- confidence score

## Fejlesztői indítás
```bash
npm install
npm run dev
```

## Következő cél — v0.3
- valós fixture API adapter
- Tippmix-prioritású meccslista
- odds és implied probability
- Value Index
- localStorage kedvencek
- modell-visszamérés alapjai

