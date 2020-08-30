import { isValueEmpty } from './check';

export const value = (check, errorMessage) => (value, context) => {
  if (!check.isRequired && isValueEmpty(value)) {
    return null;
  }

  if (check(value, context)) {
    return null;
  }

  const error =
    typeof errorMessage === 'function'
      ? errorMessage(value, context)
      : errorMessage;

  return [error];
};
