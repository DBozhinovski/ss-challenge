import { InputMap } from "../types/InputMap";

export const countChars = (input: InputMap, character: string) => {
  const count = input.reduce((count, row) => {
    const charsInRow = row.filter(field => field === character).length;
    
    if (charsInRow > 0) {
      return count = count + charsInRow;
    }
  
    return count;
  }, 0);

  return count;
} 