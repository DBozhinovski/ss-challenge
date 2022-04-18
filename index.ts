import { InputMap } from "./types/InputMap";
import { countChars } from "./util/countChars";
import { findForksAndFakeTurns } from "./util/validateTurns";
import { hasMultipleStartingPaths } from "./util/checkStartingPaths";

export const validateMap = (input: InputMap) => {
  const startsCount = countChars(input, '@');
  const endsCount = countChars(input, 'x');

  if (startsCount !== 1) {
    return false;
  }

  if (endsCount !== 1) {
    return false;
  }

  const hasForks = findForksAndFakeTurns(input);

  if (hasForks) {
    return false;
  }

  const startFork = hasMultipleStartingPaths(input);

  if (startFork) {
    return false;
  }

  return true;
}

export const walk = (input: InputMap) => {
  const valid = validateMap(input);

  if (!valid) {
    throw new Error('Map not valid; Aborting.');
  }

  const width = input[0].length;
  const height = input.length;

  console.log(width, height);
  // console.log(input);

  return false;
}