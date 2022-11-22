export const arraysAreEqual = (array1: number[], array2: number[]) => {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
};

export const adjustPressedKeys = (pressed: string[]): number[] => {
  return pressed.map((key) => {
    switch (key) {
      case "A":
        return 1;
      case "S":
        return 2;
      case "D":
        return 3;
      default:
        return 4;
    }
  });
};
