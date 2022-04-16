import { Injectable } from '@angular/core';
import { Word } from './word';
import { WORDS } from './words';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  nextWord(): Word {
    return WORDS[0];
  }
}
