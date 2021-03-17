import { $, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  let readingListToggle;

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    readingListToggle = await $('[data-testing="toggle-reading-list"]');
  });

  it('Then: I should see my reading list', async () => {
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should mark books as read and see they are read', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const addToList = element(by.partialButtonText('Want to Read'));
    await addToList.click();

    await readingListToggle.click();

    const updateFinishedToggle = $('[data-testing="update-finished"]');
    await updateFinishedToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="finished-reading"]'),
        'Finished reading on'
      )
    );
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('button[data-testing="JavaScript Patterns"]'),
        'Finished'
      )
    );

    // Set test to default state, so it won't affect future tests
    const removeFromList = await $(
      `[aria-label="Remove JavaScript Patterns from reading list"]`
    );
    await removeFromList.click();
  });
});
