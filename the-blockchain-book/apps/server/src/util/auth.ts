export function extractBearerToken(authHeader: string) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7, authHeader.length).trim();
}
