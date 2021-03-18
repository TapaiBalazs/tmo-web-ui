import { $, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  });

  it('Then: I should see my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  describe(`Then: I should be able to undo`, () => {
    let readingListToggle;

    beforeEach(async () => {
      const form = await $('form');
      const input = await $('input[type="search"]');
      await input.sendKeys('javascript');
      await form.submit();

      const addToList = element(by.partialButtonText('Want to Read'));
      await addToList.click();
      readingListToggle = await $('[data-testing="toggle-reading-list"]');
    });

    it(`my add to reading list action from snackbar`, async () => {
      await browser.executeScript(
        'document.querySelector("simple-snack-bar > div >  button").click()'
      );

      await readingListToggle.click();

      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="reading-list-container"]'),
          `You haven't added any books to your reading list yet.`
        )
      );
    });

    it(`my remove from reading list action from snackbar`, async () => {
      await readingListToggle.click();

      const removeFromList = await $(
        `[aria-label="Remove JavaScript Patterns from reading list"]`
      );
      await removeFromList.click();

      await browser.executeScript(
        'document.querySelector("simple-snack-bar > div >  button").click()'
      );

      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('.reading-list-item'),
          `JavaScript Patterns`
        )
      );

      // we empty the reading list, so tests are not affected by this when rerun
      await removeFromList.click();
    });
  });
});
