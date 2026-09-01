export const MODEL_CONFIG={
  modelVersion:'0.5.0',
  formWeights:[.35,.25,.18,.13,.09],
  homeAdvantageWeight:.07,
  eloWeight:.22,
  xgWeight:.45,
  recencyDecay:.82,
  confidence:{dataQuality:.30,modelAgreement:.20,formStability:.15,eloReliability:.15,oddsStability:.10,leaguePredictability:.10},
  elo:{defaultRating:1500,kFactor:24,goalDifferenceBonus:.12},
} as const;
