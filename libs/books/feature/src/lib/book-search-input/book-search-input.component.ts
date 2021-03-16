import { Component } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'tmo-book-search-input',
  templateUrl: './book-search-input.component.html',
  styleUrls: ['./book-search-input.component.scss'],
})
export class BookSearchInputComponent {
  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  constructor(private controlContainer: ControlContainer) {}
}
