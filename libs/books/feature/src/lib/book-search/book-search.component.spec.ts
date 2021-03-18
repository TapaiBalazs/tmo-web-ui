import { async, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, skip, take } from 'rxjs/operators';
import { BookSearchComponent } from './book-search.component';

const MOCK_STORE = {
  dispatch: jest.fn(),
  select: jest.fn().mockReturnValue(of([])),
};

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;

  beforeEach(() => {
    // We don't need to compile with TestBed this way, and the template interactions are tested on the e2e level
    component = new BookSearchComponent(MOCK_STORE as any, new FormBuilder());
    component.ngOnInit();
  });

  afterEach(() => {
    jest.resetAllMocks();
    component.ngOnDestroy();
  });

  it(`spamming search button clicks should only call the API once`, async(() => {
    component.search.pipe(skip(2), take(1)).subscribe((_) => {
      expect(MOCK_STORE.dispatch).toHaveBeenCalledTimes(1);
    });

    component.search.next();
    component.search.next();
    component.search.next();
  }));

  it(`typing should trigger search, but should not spam the API`, fakeAsync(() => {
    component.searchForm.valueChanges
      .pipe(
        debounceTime(600), // make sure that the debounceTime 500 is reached in the component
        take(1)
      )
      .subscribe((_) => {
        expect(MOCK_STORE.dispatch).toHaveBeenCalledTimes(1);
      });

    component.searchForm.patchValue({ term: 't' });
    component.searchForm.patchValue({ term: 'te' });
    component.searchForm.patchValue({ term: 'tes' });
    component.searchForm.patchValue({ term: 'test' });
    // jump 600ms forward in time
    tick(600);
  }));
});
