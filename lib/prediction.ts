export type ScoreCell = {
  home: number;
  away: number;
  probability: number;
};

export type Prediction = {
  matrix: ScoreCell[];
  homeWin: number;
  draw: number;
  awayWin: number;
  bttsYes: number;
  over15: number;
  over25: number;
  over35: number;
  expectedHome: number;
  expectedAway: number;
  predictedScore: [number, number];
  topScores: ScoreCell[];
};

const factorialCache = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];

function factorial(n: number) {
  if (n < factorialCache.length) return factorialCache[n];
  let result = factorialCache[factorialCache.length - 1];
  for (let i = factorialCache.length; i <= n; i += 1) result *= i;
  return result;
}

function poisson(k: number, lambda: number) {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

export function calculatePrediction(homeXg: number, awayXg: number, maxGoals = 7): Prediction {
  const matrix: ScoreCell[] = [];
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let bttsNo = 0;
  let under15 = 0;
  let under25 = 0;
  let under35 = 0;

  for (let home = 0; home <= maxGoals; home += 1) {
    for (let away = 0; away <= maxGoals; away += 1) {
      const probability = poisson(home, homeXg) * poisson(away, awayXg);
      matrix.push({ home, away, probability });
      if (home > away) homeWin += probability;
      else if (home === away) draw += probability;
      else awayWin += probability;
      if (home === 0 || away === 0) bttsNo += probability;
      if (home + away <= 1) under15 += probability;
      if (home + away <= 2) under25 += probability;
      if (home + away <= 3) under35 += probability;
    }
  }

  const covered = matrix.reduce((sum, cell) => sum + cell.probability, 0);
  const normalize = (value: number) => value / covered;
  const sorted = [...matrix].sort((a, b) => b.probability - a.probability);
  const top = sorted[0];

  return {
    matrix,
    homeWin: normalize(homeWin),
    draw: normalize(draw),
    awayWin: normalize(awayWin),
    bttsYes: 1 - normalize(bttsNo),
    over15: 1 - normalize(under15),
    over25: 1 - normalize(under25),
    over35: 1 - normalize(under35),
    expectedHome: homeXg,
    expectedAway: awayXg,
    predictedScore: [top.home, top.away],
    topScores: sorted.slice(0, 5).map((cell) => ({ ...cell, probability: normalize(cell.probability) })),
  };
}

export function percent(value: number) {
  return Math.round(value * 100);
}

export function confidenceScore(prediction: Prediction, dataQuality = 0.84) {
  const strongest = Math.max(prediction.homeWin, prediction.draw, prediction.awayWin);
  const edge = Math.abs(prediction.expectedHome - prediction.expectedAway);
  const score = 48 + strongest * 38 + Math.min(edge, 2.2) * 7 + dataQuality * 8;
  return Math.max(50, Math.min(96, Math.round(score)));
}

