import { InputMap } from './types/InputMap';
import { countChars } from './util/countChars';
import { findForksAndFakeTurns } from './util/validateTurns';
import { hasMultipleStartingPaths } from './util/checkStartingPaths';
import { walk } from './util/walk';

export const validateMap = (input: InputMap) => {
  const startsCount = countChars(input, '@');
  const endsCount = countChars(input, 'x');

  if (startsCount !== 1) {
    return false;
  }

  if (endsCount !== 1) {
    return false;
  }

  if (findForksAndFakeTurns(input)) {
    return false;
  }

  if (hasMultipleStartingPaths(input)) {
    return false;
  }

  return true;
};

export const run = (input: InputMap) => {
  const valid = validateMap(input);

  if (!valid) {
    throw new Error('Map not valid; Aborting.');
  }

  const res = walk(input);

  return res;
};
