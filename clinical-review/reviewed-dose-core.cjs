'use strict';
// Research-only arithmetic. NEVER enable a clinical recommendation without independent KÜB review.
function calculateReviewedDose({rule,weightKg,product}) {
  if (!rule || rule.clinicalValidated !== true || rule.calculatorEnabled !== true ||
      !rule.sourceUrl || !rule.reviewedAt || !rule.indication) {
    throw new Error('Clinical rule is not approved');
  }
  if (!Number.isFinite(weightKg) || weightKg <= 0 || weightKg > 300)
    throw new Error('Invalid weight');
  if (!['mg/kg/dose','mg/kg/day'].includes(rule.basis))
    throw new Error('Unknown dosing basis');
  if (!Number.isFinite(rule.mgPerKg) || rule.mgPerKg <= 0)
    throw new Error('Invalid mg/kg');
  if (!Number.isInteger(rule.dosesPerDay) || rule.dosesPerDay < 1 || rule.dosesPerDay > 24)
    throw new Error('Invalid frequency');
  if (!Number.isFinite(rule.maxSingleMg) || rule.maxSingleMg <= 0 ||
      !Number.isFinite(rule.maxDailyMg) || rule.maxDailyMg <= 0)
    throw new Error('Maximum doses not established');
  if (!product || !Number.isFinite(product.mg) || product.mg <= 0 ||
      !Number.isFinite(product.ml) || product.ml <= 0 ||
      product.route !== rule.route || rule.route !== 'oral' || product.ingredients)
    throw new Error('Formulation requires additional review');
  const rawSingle = rule.basis === 'mg/kg/day'
    ? weightKg * rule.mgPerKg / rule.dosesPerDay
    : weightKg * rule.mgPerKg;
  const singleMg = Math.min(rawSingle, rule.maxSingleMg, rule.maxDailyMg / rule.dosesPerDay);
  // Preserve full precision; UI-specific rounding must be separately reviewed.
  return Object.freeze({singleMg,dailyMg:singleMg*rule.dosesPerDay,
    volumeMl:singleMg*product.ml/product.mg,capped:singleMg<rawSingle});
}
module.exports={calculateReviewedDose};
