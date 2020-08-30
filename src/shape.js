import { isValidationFailed } from './check';

export const shape = (validatorsMap) => (object, context) => {
  return Object.entries(validatorsMap).reduce((acc, [key, validator]) => {
    const value = object[key];

    const errors = validator(value, context);

    if (isValidationFailed(errors)) {
      acc[key] = errors;
    }

    return acc;
  }, {});
};
