/*
 * funciones para
 * obtener y guardar
 * el token en el cliente
 */

export const jwt_get = (key: string) => {
  const jwt = window.localStorage.getItem(key);
  if (!jwt) return undefined;
  return jwt;
};

export const jwt_save = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};
