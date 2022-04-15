import { readFile } from 'fs/promises';

import { walk, validateMap } from '../index';
import { InputMap } from '../types/InputMap';

const mapPaths: { [key: string]: string } = {
  basic: `${__dirname}/maps/basic.txt`,
  missingStart: `${__dirname}/maps/missingStart.txt`,
  missingEnd: `${__dirname}/maps/missingEnd.txt`,
  multipleStarts1: `${__dirname}/maps/multipleStarts1.txt`,
  multipleStarts2: `${__dirname}/maps/multipleStarts2.txt`,
  multipleStarts3: `${__dirname}/maps/multipleStarts3.txt`,
};

const maps: { [key: string]: InputMap } = {};

const parseMap = (input: string) => {
  const rows = input.split('\n');
  const map = rows.map((r) => {
    return [...r];
  });

  return map;
}

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

  // test('provide correct output', () => {
  //   expect(walk(maps.basic)).toBe('@---A---+|C|+---+|+-B-x');
  // })
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
  test('Expect map 1 to be invalid:', () => {
    expect(validateMap(maps.multipleStarts1)).toBe(false);
  });

  test('Expect map 2 to be invalid:', () => {
    expect(validateMap(maps.multipleStarts2)).toBe(false);
  });

  test('Expect map 3 to be invalid:', () => {
    expect(validateMap(maps.multipleStarts3)).toBe(false);
  });
});