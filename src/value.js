import { isValueEmpty } from './check';
import { VALID } from './constants';

export const value = (check, errorMessage) => (val, context) => {
  if (isValueEmpty(val)) {
    return VALID;
  }

  if (check(val, context)) {
    return VALID;
  }

  const error =
    typeof errorMessage === 'function'
      ? errorMessage(val, context)
      : errorMessage;

  return [error];
};
