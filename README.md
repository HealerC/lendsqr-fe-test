# Lendsqr Frontend Engineer Assessment

The project completes the assessment testing _React, Typescript and SASS_ and is made up mainly of the _Login_, _User_ and _User Details_ pages.

The homepage is the `/landing` page that shows a login form, clicking on the log in take one to the `/users` page that shows the all the users in a tabular form and paginated. The table can be sorted by each of its fields by clicking on the icon beside any of the table headers. Clicking on the search button on the menu bar, opens a modal which contains a form that can be used to filter the table.

On each table row, is a 'more actions' icon - the last icon on the row.Clicking on that opens up a menu where one ecan

- blacklist a user
- activate a user
- View more details about a user.

Clicking on **View Details** on the menu navigates to a subroute that shows more details about the user.

The web app is a true repesentation of the [Figma design](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Lendsqr-Frontend-Engineering-Assessment?node-id=6819%3A58317&t=WOnR0dtA1953DjxY-0) plus it is responsive and has styles applyicable to even small devices. Furthermore, it accounts for cases such as:

1. On loading the data from the API, it displays skeleton components rather
   than leaving the DOM empty OR using spinners.
2. It renders some component on error cases (such as network problem causing the browser's inability to fetch data from the server).
