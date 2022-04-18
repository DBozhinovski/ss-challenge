import { InputMap } from "../types/InputMap";

export const getNeighbors = (input: InputMap, coordinates: [number, number]) => {
  const width = input[0].length - 1;
  const height = input.length - 1;

  const neighborCoordinates = [];

  if (coordinates[0] > 0) {
    neighborCoordinates.push([coordinates[0] - 1, coordinates[1]]);
  } 
  
  if (coordinates[0] < width) {
    neighborCoordinates.push([coordinates[0] + 1, coordinates[1]]);
  }

  if (coordinates[1] > 0) {
    neighborCoordinates.push([coordinates[0], coordinates[1] - 1]);
  }

  if (coordinates[1] < height) {
    neighborCoordinates.push([coordinates[0], coordinates[1] + 1]);
  }

  return neighborCoordinates;
}