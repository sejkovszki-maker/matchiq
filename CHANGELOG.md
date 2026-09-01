# MatchIQ changelog

## v0.3.0 — Data Pipeline & Value Engine

- Központi Match, Team, League, Statistics, Odds, ModelResult és Snapshot adatmodell.
- Cserélhető fixture, statisztika és odds provider réteg, külön mock/live állapottal.
- Normalizált 1X2 implied probability, Value Edge és súlyozott Value Score.
- Confidence + Value + Data Quality alapú rangsorolás.
- Modell vs Piac összehasonlító nézet és adatminőség-jelző.
- Tartós, eszközön mentett kedvencek és meccs előtti prediction snapshotok.
- Állapotkezelés: scheduled, live, finished, postponed és cancelled.
- Backtesting segédfüggvények: Brier Score, Log Loss és bináris pontosság.
- Az élő szolgáltatók konfiguráció nélkül nem állítanak elő kitalált adatot.

## v0.2.0 — Prediction Core

### Új funkciók
- Központi Poisson/xG előrejelző motor.
- Dinamikusan számított 1X2 valószínűségek.
- Dinamikusan számított BTTS és Over 1.5 / 2.5 / 3.5 piacok.
- Meccsenként generált pontos eredménymátrix 0–4 gólig megjelenítve, 0–7 gólig számolva.
- Top 5 legvalószínűbb pontos eredmény.
- Számított Confidence Score.
- A Top jelzések automatikusan confidence alapján rendeződnek.
- Működő csapat-/liga-kereső.
- Kedvenc mérkőzések jelölése a kártyákon.
- v0.2 modellstátusz és verziójelzés a felületen.

### Javítások a v0.1-hez képest
- Az eredménymátrix többé nem ugyanaz minden mérkőzésnél.
- Az Over 1.5 és Over 3.5 értékek többé nem fix 82% / 37% értékek.
- Az 1X2, BTTS, Over/Under és pontos eredmény ugyanabból a modellből származik.
- A „Miért ezt jósolja?” szöveg a ténylegesen domináns modellkimenetre hivatkozik.
- A kártyák és a részletes nézet közös, egységes előrejelzési objektumot használnak.

### Ismert korlátok
- A csapat/xG/forma adatok továbbra is tesztadatok.
- Élő Tippmix-, odds-, sérülés- és csapatstatisztikai API még nincs bekötve.
- A Kedvencek jelenleg munkamenet-állapotban vannak, még nincs localStorage/perzisztencia.
