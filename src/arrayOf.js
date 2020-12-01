import { isValidationFailed } from './check';

const defaultGetKey = (_, i) => i;

export const arrayOf = (validator, getKey = defaultGetKey) => (
  values,
  context,
) => {
  return values.reduce((acc, value, i) => {
    const error = validator(value, context);

    if (isValidationFailed(error)) {
      acc[getKey(value, i)] = error;
    }

    return acc;
  }, {});
};
