import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  confirmedAddedToReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      switchMap(({ book }) =>
        this.openSnackBar('added', book).pipe(
          filter(({ dismissedByAction }) => dismissedByAction),
          map((_) =>
            ReadingListActions.removeFromReadingList({
              item: {
                ...book,
                bookId: (book as Book).id,
              },
            })
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  confirmedRemovedFromReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      switchMap(({ item }) =>
        this.openSnackBar('removed', item).pipe(
          filter(({ dismissedByAction }) => dismissedByAction),
          map((_) =>
            ReadingListActions.addToReadingList({
              book: (item as unknown) as Book,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {}

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  private openSnackBar(
    action: 'added' | 'removed',
    item: Book | ReadingListItem
  ): Observable<MatSnackBarDismiss> {
    const snackbarRef = this.snackbar.open(
      `${item.title} ${action}...`,
      'Undo',
      {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      }
    );
    return snackbarRef.afterDismissed();
  }
}
