import { VALID } from './constants';

export const isValueEmpty = (value) =>
  value == null || String(value).trim() === '';

export const isObjectEmpty = (errors) => {
  return !Object.keys(errors).length;
};

export const isValidationSucceed = (errors) => {
  return errors === VALID || isObjectEmpty(errors);
};

export const isValidationFailed = (errors) => !isValidationSucceed(errors);

export const isNumber = (n) => Number.parseFloat(n) === +n;
export const isInteger = (n) => Number.parseInt(n) === +n;
