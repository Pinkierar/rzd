export const isString = (str: unknown, length?: number): str is string => {
  if (typeof str !== 'string') return false;
  if (length !== undefined && str.length !== length) return false;

  return true;
};