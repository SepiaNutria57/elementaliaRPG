/**
 * Calcula o bônus de uma perícia com base no nível.
 *
 * Nível 0 → 0
 * Nível 1 → +5
 * Nível 2 → +10
 * Nível 3 → +15
 * Nível 4 → +20
 * Nível 5 (Excesso) → +21
 */
export function skillBonus(level) {
  if (!level || level <= 0) return 0;

  if (level <= 4) {
    return level * 5;
  }

  // Nível 5: Excesso
  return 20 + (level - 4);
}
