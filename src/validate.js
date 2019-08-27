import { isValidateSucceed } from './check';

const defaultGetKey = (item, i) => i;

const validateValue = (check, errorMessage) => (value, context = {}) => {
  if (check(value, context)) {
    return '';
  }

  const error = typeof errorMessage === 'function'
    ? errorMessage(value, context)
    : errorMessage;

  return error;
};

const validateObject = (
  validatorsMap,
  defaultKeyValidator,
) => (
  valueObject,
  context = {},
) => {
  const errors = Object.entries(valueObject).reduce((acc, [key, value]) => {
    const keyValidator = validatorsMap[key];

    if (keyValidator) {
      acc[key] = keyValidator(value, context);
    }
    // defaultKeyValidator should be used, when you need default validation
    // for all fields in state
    if (!keyValidator && defaultKeyValidator) {
      acc[key] = defaultKeyValidator(value, context);
    }
    // if defaultKeyValidator have no value, then only state[key] which have
    // corresponding key in stateValidatorMap will be validated
    return acc;
  }, {});

  return errors;
};

const validateArray = (
  validator,
  getKey = defaultGetKey,
) => (
  valueArray,
  context = {},
) => {
  const errors = valueArray.reduce((acc, value, i) => {
    const error = validator(value, context);

    if (!isValidateSucceed(error)) {
      acc[getKey(value, i)] = error;
    }

    return acc;
  }, {});

  return errors;
};

const validateChain = (validators) => (value, context = {}) => {
  const errors = validators.reduce((acc, validator) => {
    if (!isValidateSucceed(acc)) {
      return acc;
    }

    return validator(value, context);
  }, '');

  return errors;
};

const validateCombine = (validatorsMap) => (value, context = {}) => {
  const errors = Object.entries(validatorsMap).reduce((acc, [key, validator]) => {
    acc[key] = validator(value, context);

    return acc;
  }, {});

  return errors;
};

export default {
  value: validateValue,
  object: validateObject,
  array: validateArray,
  chain: validateChain,
  combine: validateCombine,
};
