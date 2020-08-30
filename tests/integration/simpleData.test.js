import * as V from '../../src';

const NAME_REQUIRED = 'name is required';

const BUDGET_REQUIRED = 'budget is required';
const SHOULD_BE_NUMBER = 'Should be number';
const SHOULD_BE_ABOVE_ZERO = 'Should be above zero';

const DURATION_REQUIRED = 'duration is required';
const SHOULD_BE_INT = 'Should be integer';
const SHOULD_BE_LTE_5 = 'Should be less then or equal 5';

const validateData = V.shape({
  name: V.required(NAME_REQUIRED),
  budget: V.first([
    V.required(BUDGET_REQUIRED),
    V.value(V.check.isNumber, SHOULD_BE_NUMBER),
    V.value((n) => n >= 0, SHOULD_BE_ABOVE_ZERO),
  ]),
  duration: V.first([
    V.required(DURATION_REQUIRED),
    V.value(V.check.isInteger, SHOULD_BE_INT),
    V.value((n) => n <= 5, SHOULD_BE_LTE_5),
  ]),
});

describe('simple data', () => {
  it('work correct with correct data 1', () => {
    expect(
      validateData({
        name: 'John',
        budget: 100,
        duration: 5,
      }),
    ).toEqual({});

    expect(
      validateData({
        name: 'John',
        budget: '100.',
        duration: '5.',
      }),
    ).toEqual({});
  });

  it('work correct with correct data 2', () => {
    expect(
      validateData({
        name: 'John',
        budget: '100.',
        duration: '5.',
      }),
    ).toEqual({});
  });

  it('work correct with empty data', () => {
    expect(validateData({})).toEqual({
      name: [NAME_REQUIRED],
      budget: [BUDGET_REQUIRED],
      duration: [DURATION_REQUIRED],
    });
  });

  it('work correct with wrong data 1', () => {
    expect(
      validateData({
        budget: 'gdsgsd',
        duration: '543543.43',
      }),
    ).toEqual({
      name: [NAME_REQUIRED],
      budget: [SHOULD_BE_NUMBER],
      duration: [SHOULD_BE_INT],
    });
  });

  it('work correct with wrong data 2', () => {
    expect(
      validateData({
        name: 'John',
        budget: '-78',
        duration: '6',
      }),
    ).toEqual({
      budget: [SHOULD_BE_ABOVE_ZERO],
      duration: [SHOULD_BE_LTE_5],
    });
  });
});
