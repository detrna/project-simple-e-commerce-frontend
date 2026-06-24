export function objectToMap(object: object): string[][] {
  const formattedArray = Object.entries(object).flatMap(([k, v]) => {
    if (Array.isArray(v)) {
      let formatted: string[][];
      formatted = v.map((val) => [k, val]);

      return formatted;
    }

    return [[k, v]];
  });

  return formattedArray;
}
