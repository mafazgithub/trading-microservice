export function getAmountOut(
  amountIn: bigint,
  reserveIn: bigint,
  reserveOut: bigint,
): bigint {
  const feeMultiplier = 997n;
  const feeDenominator = 1000n;

  const amountInWithFee = amountIn * feeMultiplier;
  const numerator = amountInWithFee * reserveOut;
  const denominator = reserveIn * feeDenominator + amountInWithFee;

  return numerator / denominator;
}
