import { InputMap } from '../types/InputMap';
import { findSymbols } from './findSymbols';
import { getNeighbors } from './getNeighbors';

const countValidNeighborMoves = (
  input: InputMap,
  coordinates: [number, number],
  filledNeighbors: [number, number][],
) => {
  let count = 0;

  filledNeighbors.forEach((fCoordinates) => {
    const targetSymbol = input[fCoordinates[1]][fCoordinates[0]];

    if (targetSymbol !== '-' && fCoordinates[1] !== coordinates[1]) {
      count++;
    } else if (targetSymbol !== '|' && fCoordinates[0] !== coordinates[0]) {
      count++;
    }
  });

  return count;
};

export const findForksAndFakeTurns = (input: InputMap) => {
  const turnCoordinates = findSymbols(input, '+');

  console.log('==HASFORKS==');
  console.table(input);
  // Going to perf. hell for this one :D
  const hasForks = turnCoordinates.reduce((forksFound: boolean, coordinates) => {
    const neighborCoordinates = getNeighbors(input, coordinates);

    const filledNeighbors = neighborCoordinates.filter((coordinates) => {
      const target = input[coordinates[1]][coordinates[0]];
      // Also, f**k newlines :@
      if (target !== ' ') {
        return true;
      }
    });

    if (filledNeighbors.length !== 2) {
      // Check whether we're running in a compact space -.-
      const validMoves = countValidNeighborMoves(input, coordinates, filledNeighbors as [number, number][]);
      console.log(validMoves);

      if (validMoves !== 2) {
        forksFound = true;
      }
    }

    // if (filledNeighbors !== 2) {
    //   forksFound = true;
    // }

    return forksFound;
  }, false);

  const hasFakeTurns = turnCoordinates.reduce((fakeTurnsFound: boolean, coordinates) => {
    const neighborCoordinates = getNeighbors(input, coordinates);

    const filledNeighbors = neighborCoordinates.filter((coordinates) => {
      const target = input[coordinates[1]][coordinates[0]];

      if (target !== ' ') {
        return true;
      }
    });

    const countNeighborsOnSameAxis = filledNeighbors.reduce(
      (counters, filledCoordinates) => {
        if (coordinates[0] === filledCoordinates[0]) {
          counters[0]++;
        }

        if (coordinates[1] === filledCoordinates[1]) {
          counters[1]++;
        }

        return counters;
      },
      [0, 0],
    );

    if (countNeighborsOnSameAxis[0] > 1 || countNeighborsOnSameAxis[1] > 1) {
      // Check whether we're running in a compact space -.-
      if (filledNeighbors.length === 2) {
        fakeTurnsFound = true; // Fake turn
      } else {
        const validMoves = countValidNeighborMoves(input, coordinates, filledNeighbors as [number, number][]);
        if (validMoves !== 2) {
          fakeTurnsFound = true;
        }
      }
    }

    return fakeTurnsFound;
  }, false);

  console.log('hasForks', hasForks);
  console.log('hasFakeTurns', hasFakeTurns);

  return hasForks || hasFakeTurns;
};
