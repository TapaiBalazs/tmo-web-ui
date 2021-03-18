# Code Review

## Project setup issues

At first, I could not start the `e2e` tests, because of `Unknown system error -86` was thrown by Protractor. I have traced back to [this](https://github.com/angular/protractor/issues/5486) github issue.

I am on MacOS Big Sur and it had an issue downloading the wrong driver for protractor/selenium. The final solution was to remove the `package-lock.json` file and to run npm i again. I included this fix in my `main` branches initial commit.

## Code Smells, problems, improvements

- Indicating loading state would improve user experience greatly. (spinner, or something)
- Error and empty search result indication would be useful for the user
- `nx format:write` was not called on the project, and it included a lot of changes
- The Book search and Reading list related code could be extracted into separate modules to separate the logic
- The `+state` folder under `data-access` could be split into sub-folders to make it more maintainable
- API swagger documentation would be really helpful and would increase developer experience
- A global error handler on the UI would be useful, handling API errors could help greatly

- `book-search.component.html`
  - readability: 'b', use 'book' for a more readable variable name
  - this file should be split up into separate components to separate logic (search bar and book cards)
  - `b.authors.join('')` in the template is not good for performance, it should be extracted into a pipe and reused in other components as well
- `book-search.component.ts`
  - missing subscription handling
  - subscription should be done with the `async` pipe
  - `formatDate()` method should go into a pipe for better performance
  - `formatDate` returns `undefined` in one case, which is a bad practice, return `null`;
  - searchTerm getter is called on every change detection cycle, using the form value directly would be
- `reading-list.component.html`
  - readability: 'b', use 'book' for a more readable variable name
  - `b.authors.joni('')` should be extracted to a pipe
- `total-count.component.ts`
  - Unused `ngOnInit()` method should be deleted

## Accessibility

- search button does not have proper aria-label set
- reading list menu button has insufficient contrast ratio
- "Try searching..." text has insufficient contrast ratio
- The "Javascript" link in the search "Try searching..." text should be a button, since it does not navigate onto other pages
- The search input field does not have a proper label and name, placeholder is not enough
- book images should have at least an empty alt attribute
- navigating with voice-over does not describe the book for blind users, it just says "Want to read"
- Book titles are in divs, I'd put them in h2 tags, and I'd add a `tabindex='0'` so the book title is read for the visually impaired users before jumping to the `Want to read` button.
