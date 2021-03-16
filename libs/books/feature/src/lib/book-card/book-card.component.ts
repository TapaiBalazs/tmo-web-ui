import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, ReadingListBook } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input()
  book: ReadingListBook;

  constructor(private readonly store: Store) {}

  addBookToReadingList(book: ReadingListBook) {
    this.store.dispatch(addToReadingList({ book }));
  }
}
