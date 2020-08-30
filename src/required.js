import { isValueEmpty } from './check';

export const required = (message) => {
  const validator = (value) => {
    if (isValueEmpty(value)) {
      return message;
    }

    return null;
  };

  validator.isRequired = true;

  return validator;
};
