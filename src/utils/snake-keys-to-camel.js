const toCamel = (string) => {
  return string.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace(`_`, ``);
  });
};

const isArray = (array) => Array.isArray(array);

const isObject = (object) =>
  object === Object(object) && !isArray(object) && typeof object !== `function`;

export const keysToCamel = (object) => {
  if (isObject(object)) {
    const newObject = {};

    Object.keys(object)
      .forEach((key) => {
        newObject[toCamel(key)] = keysToCamel(object[key]);
      });

    return newObject;
  } else if (isArray(object)) {
    return object.map((item) => {
      return keysToCamel(item);
    });
  }

  return object;
};

