import { Injectable } from '@angular/core';
import { min } from 'rxjs';
import { Word } from './word';
import { WORDS } from './words';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  nextWord(): Word {
    let next_due_word = WORDS[0];
    let next_due_date = WORDS[0].due;
    if (next_due_date === undefined) return next_due_word;
    for (let word of WORDS) {
      if (word.due === undefined || word.due < Date.now()) return word;
      if (word.due !== undefined && word.due < next_due_date) {
        next_due_word = word;
        next_due_date = word.due;
      }
    }
    return next_due_word;
  }
}
