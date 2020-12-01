import { isValueEmpty } from './check';
import { VALID } from './constants';

export const value = (check, errorMessage) => (value, context) => {
  if (isValueEmpty(value)) {
    return VALID;
  }

  if (check(value, context)) {
    return VALID;
  }

  const error =
    typeof errorMessage === 'function'
      ? errorMessage(value, context)
      : errorMessage;

  return [error];
};
