// Enum em JavaScript, compatível com a execução direta de TypeScript no Node.
export const SurfLevel = {
  Iniciante: "Iniciante",
  Intermediario: "Intermediário",
  Avancado: "Avançado",
} as const;

export type SurfLevel = (typeof SurfLevel)[keyof typeof SurfLevel];
export const surfLevels = Object.values(SurfLevel);

export function isSurfLevel(value: unknown): value is SurfLevel {
  return surfLevels.some((surfLevel) => surfLevel === value);
}
