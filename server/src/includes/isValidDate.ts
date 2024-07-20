import {isString} from '#includes/isString';

export const isValidDate = (str: unknown): str is string => {
  if (!isString(str, 10)) return false;
  if (new Date(str).toString() === 'Invalid Date') return false;

  return true;
};