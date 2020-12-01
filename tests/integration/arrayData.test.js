import * as V from '../../src';

const validateName = V.first([
  V.required('name required'),
  V.value((str) => /^\D+$/.test(str), 'name cannot include numbers'),
  V.value((str) => str.length <= 20, 'name too long'),
]);

const validatePerson = V.shape({
  name: validateName,
  age: V.value((n) => n < 200, 'too old'),
});

const validatePersonsByName = V.arrayOf(
  validatePerson,
  (person) => person.name,
);

const validatePersonByIndex = V.arrayOf(validatePerson);

describe('validatePersonsByName', () => {
  it('works correct with empty data', () => {
    expect(validatePersonsByName([])).toEqual({});
  });

  it('works correct with correct data', () => {
    expect(
      validatePersonsByName([
        {
          name: 'Bob',
          age: '51',
        },
        {
          name: 'John',
          age: 18,
        },
      ]),
    ).toEqual({});
  });

  it('works correct with wrong data', () => {
    expect(
      validatePersonsByName([
        {
          name: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff',
          age: '201',
        },
        {
          name: 'John1',
          age: 18,
        },
      ]),
    ).toEqual({
      'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff': {
        name: ['name too long'],
        age: ['too old'],
      },
      John1: {
        name: ['name cannot include numbers'],
      },
    });
  });
});

describe('validatePersonByIndex', () => {
  it('works correct with wrong data', () => {
    expect(
      validatePersonByIndex([
        {
          name: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff',
          age: '201',
        },
        {
          name: 'John1',
          age: 18,
        },
      ]),
    ).toEqual({
      0: {
        name: ['name too long'],
        age: ['too old'],
      },
      1: {
        name: ['name cannot include numbers'],
      },
    });
  });
});
