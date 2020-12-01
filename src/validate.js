import { isValidationSucceed } from './check';

const defaultGetKey = (item, i) => i;

const validateArray = (validator, getKey = defaultGetKey) => (
  valueArray,
  context = {},
) => {
  const errors = valueArray.reduce((acc, value, i) => {
    const error = validator(value, context);

    if (!isValidationSucceed(error)) {
      acc[getKey(value, i)] = error;
    }

    return acc;
  }, {});

  return errors;
};

const validateChain = (validators) => (value, context = {}) => {
  const errors = validators.reduce((acc, validator) => {
    if (!isValidationSucceed(acc)) {
      return acc;
    }

    return validator(value, context);
  }, '');

  return errors;
};

const validateCombine = (validatorsMap) => (value, context = {}) => {
  const errors = Object.entries(validatorsMap).reduce(
    (acc, [key, validator]) => {
      acc[key] = validator(value, context);

      return acc;
    },
    {},
  );

  return errors;
};

export default {
  array: validateArray,
  chain: validateChain,
  combine: validateCombine,
};
