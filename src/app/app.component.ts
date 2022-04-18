import { Component } from '@angular/core';
import { Word } from './word';
import { WordService } from './word.service';
declare var HanziWriter: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  writer: any;
  word?: Word;
  complete: boolean = false;
  characters: string = '';

  constructor(private wordService: WordService) {}

  ngOnInit() {
    this.writer = new HanziWriter('writer', {
      width: 100,
      height: 100,
      padding: 0,
      showCharacter: false,
      showOutline: false,
      highlightOnComplete: false,
      drawingWidth: 30,
    });
    this.nextWord();
  }

  good() {
    this.word?.good();
    this.nextWord();
  }

  again() {
    this.word?.again();
    this.nextWord();
  }

  nextWord() {
    this.word = this.wordService.nextWord();
    this.complete = false;
    this.setCharacters();
    this.quiz();
  }

  setCharacters(index: number = -1) {
    if (this.word === undefined) return;
    const done = this.word.simplified.substring(0, index + 1);
    this.characters = done + '_'.repeat(this.word.simplified.length - index - 1);
  }

  quiz(index: number = 0): void {
    this.writer.setCharacter(this.word?.simplified[index]);
    this.writer.quiz({
      onComplete: (summaryData: any) => {
        this.setCharacters(index);
        if (index + 1 === this.word?.simplified.length) {
          this.complete = true;
        } else {
          this.quiz(index + 1);
        }
      },
    });
  }
}
