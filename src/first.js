import { isValidationFailed } from './check';

export const first = (validators) => (value, context) => {
  return validators.reduce((acc, validator) => {
    if (isValidationFailed(acc)) {
      return acc;
    }

    return validator(value, context);
  }, null);
};
