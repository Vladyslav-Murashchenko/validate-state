import { isValueEmpty } from './check';
import { VALID } from './constants';

export const required = (message) => (value) => {
  if (isValueEmpty(value)) {
    return [message];
  }

  return VALID;
};
