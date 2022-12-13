/*
 * Constantes identificar el estado 
 * de la autenticación
*/
export const AUTH_STATUS = {
  INITIAL: 0,
  AUTHENTICATED: 1,
  FAILED: -1,
}


export const JWT_STATUS = {
  INITIAL: 0,
  JWT_EXISTS: 1,
  JWT_DOES_NOT_EXIST: -1,
  JWT_HAS_NOT_EXPIRED: 2,
  JWT_HAS_EXPIRED: -2,
}
