import { isValidationFailed } from './check';
import { VALID } from './constants';

export const first = (validators) => (value, context) => {
  return validators.reduce((acc, validator) => {
    if (isValidationFailed(acc)) {
      return acc;
    }

    return validator(value, context);
  }, VALID);
};
