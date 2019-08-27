export const isValidateSucceed = (errors) => {
  if (typeof errors !== 'object') {
    return !errors;
  }

  return Object.values(errors).every(isValidateSucceed);
};

export const isRequired = (value) => value != null && !!String(value);

export const isNumber = (value) => Number.isFinite(+value);
export const isInteger = (value) => Number.isInteger(+value);
export const isSafeInteger = (value) => +value < Number.MAX_SAFE_INTEGER;
export const isAboveZero = (value) => +value > 0;
export const isAboveOrEqualZero = (value) => +value >= 0;
export const hasMaxTwoSignsAfterDot = (value) => !value.match(/\.\d{3}/);
