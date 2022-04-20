export const calculateSkip = (previous: [number, number], current: [number, number], isTurn = false) => {
  // If we happen to be on a turn, skip works well, with a turn
  if (isTurn) {
    if (previous[0] > current[0]) {
      return [current[0], current[1] - 1];
    } else if (previous[1] > current[1]) {
      return [current[0] + 1, current[1]];
    } else if (previous[0] < current[0]) {
      return [current[0], current[1] + 1];
    } else if (previous[1] < current[1]) {
      return [current[0] - 1, current[1]];
    }
  }

  // Otherwise, just force to a coordinate set on the same axis
  if (previous[0] > current[0]) {
    return [current[0] - 1, current[1]];
  } else if (previous[1] > current[1]) {
    return [current[0], current[1] - 1];
  } else if (previous[0] < current[0]) {
    return [current[0] + 1, current[1]];
  } else if (previous[1] < current[1]) {
    return [current[0], current[1] + 1];
  }
};
