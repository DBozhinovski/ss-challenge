import { InputMap } from "../types/InputMap";
import { findSymbols } from "./findSymbols";
import { getNeighbors } from "./getNeighbors";

export const findForksAndFakeTurns = (input: InputMap) => {
  const turnCoordinates = findSymbols(input, '+');
 
  // Going to perf. hell for this one :D
  const hasForks = turnCoordinates.reduce((forksFound: boolean, coordinates) => {
    const neighborCoordinates = getNeighbors(input, coordinates);

    const filledNeighbors = neighborCoordinates.reduce((count: number, coordinates) => {
      const target = input[coordinates[1]][coordinates[0]];
      if (target !== ' ') {
        count++;
      }

      return count;
    }, 0);

    if (filledNeighbors !== 2) {
      forksFound = true;
    }

    return forksFound;
  }, false);

  const hasFakeTurns = turnCoordinates.reduce((fakeTurnsFound: boolean, coordinates) => {
    const neighborCoordinates = getNeighbors(input, coordinates);

    const filledNeighbors = neighborCoordinates.filter((coordinates) => {
      const target = input[coordinates[1]][coordinates[0]];

      if (target !== ' ') {
        return true;
      }

      return false;
    });

    const countNeighborsOnSameAxis = filledNeighbors.reduce((counters, filledCoordinates) => {
      if (coordinates[0] === filledCoordinates[0]) {
        counters[0]++;
      }

      if (coordinates[1] === filledCoordinates[1])  {
        counters[1]++;
      }

      return counters;
    }, [0, 0]);

    if (countNeighborsOnSameAxis[0] > 1 || countNeighborsOnSameAxis[1] > 1) {
      fakeTurnsFound = true;
    }

    return fakeTurnsFound;
  }, false);

  return hasForks || hasFakeTurns;
}