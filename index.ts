import { InputMap } from "./types/InputMap";
import { countChars } from "./util/countChars";

export const validateMap = (input: InputMap) => {
  const startsCount = countChars(input, '@');
  const endsCount = countChars(input, 'x');

  if (startsCount !== 1) {
    console.error('Map invalid - wrong number of start chars.');
    return false;
  }

  if (endsCount !== 1) {
    console.error('Map invalid - wrong number of end chars.');
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