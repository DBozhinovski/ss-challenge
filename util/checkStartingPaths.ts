import { InputMap } from '../types/InputMap';
import { findSymbols } from './findSymbols';
import { getNeighbors } from './getNeighbors';

export const hasMultipleStartingPaths = (input: InputMap) => {
  const startCoordinates = findSymbols(input, '@');
  // We've already eliminated multiple starts, so it's safe to assume that we're only dealing with a single starting point
  const neighborCoordinates = getNeighbors(input, startCoordinates[0]);

  const filledNeighbors = neighborCoordinates.filter((coordinates) => {
    const target = input[coordinates[1]][coordinates[0]];

    if (target !== ' ') {
      return true;
    }

    return false;
  });

  if (filledNeighbors.length > 1) {
    return true;
  }

  return false;
};
