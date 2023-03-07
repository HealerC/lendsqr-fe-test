import { useLocation, matchPath } from "react-router-dom";

/*
 * Check if the present route location matches any of the above route
 * and return the match. Used for handling and styling Tab component below\
 * Basically returns the pattern of the current "active" route
 */
export default function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}
