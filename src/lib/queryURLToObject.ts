export default function queryURLToObject(queryURL: URLSearchParams): any {
  return Object.fromEntries(queryURL.entries());
}
