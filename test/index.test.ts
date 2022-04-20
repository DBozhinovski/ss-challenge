import { readFile } from 'fs/promises';
import util from 'util';
import console from 'console';

import { run, validateMap } from '../index';
import { InputMap } from '../types/InputMap';

const mapPaths: { [key: string]: string } = {
  basic: `${__dirname}/maps/basic.txt`,
  missingStart: `${__dirname}/maps/missingStart.txt`,
  missingEnd: `${__dirname}/maps/missingEnd.txt`,
  multipleStarts1: `${__dirname}/maps/multipleStarts1.txt`,
  multipleStarts2: `${__dirname}/maps/multipleStarts2.txt`,
  multipleStarts3: `${__dirname}/maps/multipleStarts3.txt`,
  fork: `${__dirname}/maps/fork.txt`,
  fakeTurn: `${__dirname}/maps/fakeTurn.txt`,
  multipleStartPaths: `${__dirname}/maps/multipleStartPaths.txt`,
  intersections: `${__dirname}/maps/intersections.txt`,
  letterTurn: `${__dirname}/maps/letterTurn.txt`,
  doubleLetter: `${__dirname}/maps/doubleLetter.txt`,
  compactSpace: `${__dirname}/maps/compactSpace.txt`,
  lettersAfterEnd: `${__dirname}/maps/lettersAfterEnd.txt`,
};

const maps: { [key: string]: InputMap } = {};

const parseMap = (input: string) => {
  const rows = input.split('\n');
  const map = rows.map((r) => {
    return [...r];
  });

  return map;
};

beforeAll(async () => {
  const promises = Object.keys(mapPaths).map(async (k) => {
    const buffer = await readFile(mapPaths[k]);
    maps[k] = parseMap(buffer.toString());
  });

  await Promise.all(promises);
});

describe('Expect basic map to:', () => {
  test('be valid', () => {
    expect(validateMap(maps.basic)).toBe(true);
  });

  test('provide correct output', () => {
    expect(run(maps.basic)).toEqual({
      path: '@---A---+|C|+---+|+-B-x',
      letters: 'ACB',
    });
  });
});

describe('Expect missing start map to:', () => {
  test('be invalid', () => {
    expect(validateMap(maps.missingStart)).toBe(false);
  });
});

describe('Expect missing end map to:', () => {
  test('be invalid', () => {
    expect(validateMap(maps.missingEnd)).toBe(false);
  });
});

describe('Multiple starts maps:', () => {
  test('Expect map 1 to be invalid', () => {
    expect(validateMap(maps.multipleStarts1)).toBe(false);
  });

  test('Expect map 2 to be invalid', () => {
    expect(validateMap(maps.multipleStarts2)).toBe(false);
  });

  test('Expect map 3 to be invalid', () => {
    expect(validateMap(maps.multipleStarts3)).toBe(false);
  });
});

describe('Expect fork map to:', () => {
  test('be invalid', () => {
    expect(validateMap(maps.fork)).toBe(false);
  });
});

describe('Expect fake turn map to:', () => {
  test('be invalid', () => {
    expect(validateMap(maps.fakeTurn)).toBe(false);
  });
});

describe('Expect multiple start paths map:', () => {
  test('be invalid', () => {
    expect(validateMap(maps.multipleStartPaths)).toBe(false);
  });
});

describe('Expect intersection map to:', () => {
  test('be valid', () => {
    expect(validateMap(maps.intersections)).toBe(true);
  });

  test('provide correct output', () => {
    expect(run(maps.intersections)).toEqual({
      path: '@|A+---B--+|+--C-+|-||+---D--+|x',
      letters: 'ABCD',
    });
  });
});

describe('Expect letter turn map to:', () => {
  test('be valid', () => {
    expect(validateMap(maps.letterTurn)).toBe(true);
  });

  test('provide correct output', () => {
    expect(run(maps.letterTurn)).toEqual({
      path: '@---A---+|||C---+|+-B-x',
      letters: 'ACB',
    });
  });
});

describe('Expect double letter map to:', () => {
  test('be valid', () => {
    expect(validateMap(maps.doubleLetter)).toBe(true);
  });

  test('provide correct output', () => {
    expect(run(maps.doubleLetter)).toEqual({
      path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
      letters: 'GOONIES',
    });
  });
});

describe('Expect compact space map to:', () => {
  test('be valid', () => {
    expect(validateMap(maps.compactSpace)).toBe(true);
  });

  test('provide correct output', () => {
    expect(run(maps.compactSpace)).toEqual({
      path: '@B+++B|+-L-+A+++A-+Hx',
      letters: 'BLAH',
    });
  });
});

describe('Expect letters after end map to:', () => {
  test('be valid', () => {
    expect(validateMap(maps.lettersAfterEnd)).toBe(true);
  });

  test('provide correct output', () => {
    expect(run(maps.lettersAfterEnd)).toEqual({
      path: '@-A--+|+-B--x',
      letters: 'AB',
    });
  });
});
