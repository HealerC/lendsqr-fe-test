/**
 * You have data that will span many pages. E.g. a list of users to show 10 users
 * per page. The method will calculate and return the users that should be on
 * the specified page.
 * @param list The entire list of items. An array
 * @param page The particular page you're on... a number (e.g. page `1`)
 * @param itemsPerPage The total number of items per page
 * @returns A sliced list containing the items that should be on the page
 */
export default function limitResultCount<T>(
  list: T[],
  page: number,
  itemsPerPage: number
) {
  let start = page * itemsPerPage - itemsPerPage;
  // The index of the first item in the page
  let tempEnd = start + itemsPerPage;
  let end = tempEnd >= list.length ? list.length + 1 : tempEnd;
  // The last item of the page... It should be equal to the last item of the page
  // if it overflows

  return list.slice(start, end);
}
