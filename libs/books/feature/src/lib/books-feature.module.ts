import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BooksDataAccessModule } from '@tmo/books/data-access';
import { BookSearchComponent } from './book-search/book-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TotalCountComponent } from './total-count/total-count.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { BookSearchInputComponent } from './book-search-input/book-search-input.component';
import { BookCardComponent } from './book-card/book-card.component';
import { FormatDatePipe } from './format-date.pipe';

const EXPORTS = [
  BookSearchComponent,
  TotalCountComponent,
  ReadingListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BookSearchComponent },
    ]),
    BooksDataAccessModule,
  ],
  exports: [...EXPORTS],
  declarations: [
    ...EXPORTS,
    BookSearchInputComponent,
    BookCardComponent,
    FormatDatePipe,
  ],
})
export class BooksFeatureModule {}
