export function queryURLToObject(queryURL: URLSearchParams): any {
  const params: Record<string, string[] | string> = {};

  for (const key of queryURL.keys()) {
    const keys = queryURL.getAll(key);
    const filteredKeys = keys.length === 1 ? keys[0] : keys;
    params[key] = filteredKeys;
  }

  return params;
}
