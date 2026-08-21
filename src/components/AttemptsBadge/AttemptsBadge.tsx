import { Badge } from "../Badge";

interface AttemptsBadgeProps {
  attempts: number;
}

/** "Intentos: N" pill shown during the game. */
export function AttemptsBadge({ attempts }: AttemptsBadgeProps) {
  return <Badge>Intentos: {attempts}</Badge>;
}
