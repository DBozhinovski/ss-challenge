export const calculateSkip = (previous: [number, number], current: [number, number]) => {
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
