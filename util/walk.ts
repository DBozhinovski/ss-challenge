import { InputMap } from '../types/InputMap';
import { calculateSkip } from './calculateSkip';
import { findSymbols } from './findSymbols';
import { getNeighbors } from './getNeighbors';

const data = {
  walking: true,
  path: '',
  letters: '',
  passed: [] as Array<[number, number]>,
};

const moveTo = (input: InputMap, coordinates: [number, number]): [number, number] => {
  const currentSymbol = input[coordinates[1]][coordinates[0]];
  const neighborCoordinates = getNeighbors(input, coordinates);

  const nonEmptyNeighbors = neighborCoordinates.filter((nCoordinates) => {
    const target = input[nCoordinates[1]][nCoordinates[0]];

    if (target !== ' ') {
      return true;
    }

    return false;
  });

  if (nonEmptyNeighbors.length === 1) {
    return nonEmptyNeighbors[0] as [number, number];
  }

  // Next (possible) move: any non-empty neighbor that we haven't yet passed
  const next = nonEmptyNeighbors.filter((neighbor) => {
    const passed = data.passed.find((pCoordinates) => {
      return pCoordinates[0] === neighbor[0] && pCoordinates[1] === neighbor[1];
    });

    if (passed) {
      return false;
    }

    return true;
  });

  if (next[0]) {
    if (next.length === 1) {
      // We only have a single possible move, so we do that
      return next[0] as [number, number];
    } else {
      // We need a decision on where to move, so we'll compare symbols to pick a direction
      const previousCoordinates = data.passed[data.passed.length - 1];
      const previousSymbol = input[previousCoordinates[1]][previousCoordinates[0]];

      // Try finding a symbol in next that's identical to current to maintain direction
      const hasIdenticalNext = next.find((nCoordinates) => {
        return currentSymbol === input[nCoordinates[1]][nCoordinates[0]];
      });

      if (hasIdenticalNext) {
        return hasIdenticalNext as [number, number];
      }
    }
  }

  // Calculate skip; We do a little hacking XD
  // Basically, if we haven't found where to move to (ie. next is empty, meaning we passed all possible fields)
  // We just skip over, or rather, brute force to the crossover position
  const nextWithSkip = calculateSkip(data.passed[data.passed.length - 1], coordinates, currentSymbol === '+');
  return nextWithSkip as [number, number];
};

const collectAndMove = (input: InputMap, currentPosition: [number, number]) => {
  const next: [number, number] = moveTo(input, currentPosition);
  const currentSymbol = input[currentPosition[1]][currentPosition[0]];

  if (currentSymbol.match(/[A-Z]/i) && currentSymbol !== 'x') {
    // Check whether we're crossing
    const passed = data.passed.find((coordinates) => {
      return coordinates[0] === currentPosition[0] && coordinates[1] === currentPosition[1];
    });

    if (!passed) {
      data.letters = `${data.letters}${currentSymbol}`;
    }
  }

  data.path = `${data.path}${currentSymbol}`;
  data.passed.push(currentPosition);

  // We're done here
  if (currentSymbol === 'x') {
    data.walking = false;
    return;
  } else {
    collectAndMove(input, next);
  }
};

export const walk = (input: InputMap) => {
  // Reset from previous run, as it bit me in the a** on the intersection test
  // "Shared mutable state is the root of all evil", as I keep on forgetting 🤷
  data.walking = true;
  data.path = '';
  data.letters = '';
  data.passed = [];

  const start = findSymbols(input, '@');

  try {
    collectAndMove(input, start[0]);
  } catch {
    // Basically, there's a hole in the path. The only non-practical case to catch in the validation step
    throw new Error('Map not valid; Aborting.');
  }

  return {
    path: data.path,
    letters: data.letters,
  };
};
