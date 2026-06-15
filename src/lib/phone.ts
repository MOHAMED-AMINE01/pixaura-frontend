/**
 * Validation souple d'un numéro de téléphone (français OU international).
 * Accepte les séparateurs usuels (espaces, points, tirets, parenthèses, /),
 * un éventuel préfixe international "+" ou "00", puis 8 à 15 chiffres (norme E.164).
 * Rejette tout ce qui n'est pas un vrai numéro (ex. un nom comme « Franck »).
 */
export function isValidPhone(value: string): boolean {
  if (!value) return false;
  const cleaned = value.replace(/[\s.\-()/]/g, "").replace(/^00/, "+");
  return /^\+?\d{8,15}$/.test(cleaned);
}
