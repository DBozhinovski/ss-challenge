import { InputMap } from '../types/InputMap';

export const findSymbols = (input: InputMap, symbolToFind: string) => {
  const turns = input.reduce((a, b, y) => {
    b.forEach((symbol, x) => {
      if (symbol === symbolToFind) {
        a.push([x, y]);
      }
    });

    return a;
  }, [] as Array<[number, number]>);

  return turns;
};
