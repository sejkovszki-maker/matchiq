# MatchIQ changelog

## v0.6.0 — Squad Intelligence & Match Context Engine

- Player Impact és Replacement Quality számítás.
- Forrásbizonyossággal súlyozott availability és squad strength.
- Várható kezdő, lineup confidence és formation stability.
- Rest advantage, congestion, rotation risk, travel és manager context.
- Korlátozott squad, rest, rotation és context xG-korrekció.
- Kibővített confidence lineup-, squad- és context-stability komponensekkel.
- Csapathelyzet, xG adjustment flow és confidence breakdown a meccsoldalon.
- Prediction Change Log és Important Update adatmodell.
- D1 migráció a kontextusfrissítésekhez és előrejelzés-változásokhoz.
- Élő keretforrás hiányában minden ilyen adat demonstrációsként jelenik meg.

## v0.5.0 — Historical Database & Model Lab

- Időbélyegzett történeti mérkőzés- és prediction snapshot séma D1 adatbázishoz.
- Kötelező data-leakage ellenőrzés a kickoff előtti adatokra.
- Liga-, szezon- és modellverzió-szűrhető backtest engine.
- Accuracy, Brier Score, Log Loss, Calibration Error, ROI, Yield és max drawdown.
- Bucket probability calibration és confidence calibration alap.
- Időrendi 60/20/20 split és walk-forward validáció.
- Parameter grid, experiment runner és modellverzió összehasonlítási alap.
- Market benchmark, value-bet szimulátor és minimum sample size védelem.
- Modell Labor felület őszinte, üres dataset állapottal; kitalált eredményeket nem közöl.

## v0.4.0 — Advanced Team Strength Engine

- Külön támadó-, védő-, hazai és idegenbeli csapaterő.
- Liga-specifikus gólátlag, hazai előny, K-faktor és kiszámíthatósági profil.
- Dinamikus Elo-frissítési algoritmus ellenfélerő- és gólkülönbség-korrekcióval.
- Recency-súlyozott forma xG, xGA, eredmény, környezet és ellenfél Elo alapján.
- Többrétegű expected goals motor és Poisson-eredménymátrix.
- Poisson, Team Strength, Elo/Forma és piac konszenzus.
- Súlyozott confidence: adatminőség, konszenzus, formastabilitás, Elo, odds és liga.
- Prediction Breakdown, csapaterő-, Elo- és konszenzusnézet.
- Központi Model Config és 0.4.0 snapshot-verzióazonosító.

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
# MatchIQ v0.7.0 – Live Production & Tippmix Integration (BETA)

- Elkészült a `live / demo / offline` adatút és az őszintén jelölt demo fallback.
- Bevezetve a Tippmix provider-szerződés, az entitásleképezés és a 75% alatti manuális felülvizsgálat.
- A value engine már Edge, EV, Confidence, Data Quality, likviditás és stabilitás alapján osztályoz.
- A legjobb jelzés csak a minimumfeltételeket teljesítő piacok közül kerül ki; ellenkező esetben „Nincs value”.
- Dinamikus napi dátum, adatfrissesség, provider health, prediction stability és részletes forrásidők.
- Új D1 migráció az odds-idősorhoz, provider mappinghez, snapshotokhoz, eredményekhez és health állapothoz.
- Az élő szolgáltatói kulcsok nincsenek a repóban; azok bekötéséig a kiadás BETA demo módban marad.
# MatchIQ v0.8.0 – Production Reliability, Automation & Monitoring

- Scheduler, prioritásos és idempotens job queue, retry/backoff motor.
- TTL cache és stale-while-revalidate alap, freshness számítás.
- Provider-, prediction- és value-integritás validálás.
- Rate-limit manager, circuit breaker, health monitor és alert engine.
- Audit események, biztonságos publikus hibaüzenetek és D1 naplózási séma.
- Production 0.7.0 és 0.8.0 shadow candidate modellregiszter.
- Új Rendszerállapot felület; ismeretlen telemetriából nem készít kitalált uptime-adatot.
- D1 migráció jobokhoz, cache-hez, audit loghoz, alerthez, lockhoz és napi integrity reporthoz.
# MatchIQ v0.9.0 – Public Beta, Performance Dashboard & User Experience

- Új, mintaalapú teljesítménydashboard 7/30/90 napos, szezon és összes időszakkal.
- Prediction History és kalibrációs nézet hiteles FINAL_PREMATCH adatokra előkészítve.
- Egyszerű/Haladó és Kompakt/Részletes felhasználói nézetek.
- Automatikus Prediction Grade és külön Value Grade.
- Kedvencek blokk, felhasználói preferenciák és in-app értesítési alap.
- Közérthető AI Modell és felhasználóbarát modellváltozások oldal.
- D1 séma felhasználói profilhoz, kedvencekhez, watchlisthez, értesítésekhez, feedbackhez és teljesítmény-összesítésekhez.
- Valódi történelmi minta hiányában az oldal nem közöl kitalált accuracy-, ROI- vagy kalibrációs értéket.
# MatchIQ v1.0.0-rc.1 – Production Release Candidate

- Bevezetve a bizonyíték-alapú Release Gate; a végleges 1.0.0 címke blokkolt, amíg minden kapu nem PASS.
- Egységes provider contract, canonical match ID és végleges Tippmix mapping státuszok.
- Raw és kalibrált probability/confidence szétválasztása; a fő UI kalibrált értéket mutat.
- No Prediction Policy és csökkentett modellhez tartozó felhasználói figyelmeztetések.
- Model governance rekordok, immutable FINAL_PREMATCH snapshot séma és korrekciós napló.
- Incident-, release-check- és kiterjesztett eredménymodell alapok.
- Magyar lokalizációs katalógus és production navigáció.
- A kiadás szándékosan RC: élő provider-, uptime-, security audit- és restore-test bizonyíték nélkül nem állítja magáról, hogy production-ready.
