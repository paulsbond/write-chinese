import { Component } from '@angular/core';
import { Word } from './word';
import { WordService } from './word.service';
import pinyin from './data/pinyin.json';
import definitions from './data/definitions.json';
declare var HanziWriter: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  writer: any;
  word?: Word;
  pinyin: string = '';
  definition: string = '';
  complete: boolean = false;
  characters: string = '';
  characterIndex: number = 0;
  outlineShown: boolean = false;

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
      outlineColor: '#CCC',
      delayBetweenStrokes: 200,
      strokeFadeDuration: 400,
    });
    this.nextWord();
  }

  toggleOutline() {
    if (this.outlineShown) {
      this.hideOutline();
    } else {
      this.showOutline();
    }
  }

  showOutline() {
    this.writer.showOutline();
    this.outlineShown = true;
  }

  hideOutline() {
    this.writer.hideOutline();
    this.outlineShown = false;
  }

  animate() {
    this.showOutline();
    this.writer.animateCharacter({ onComplete: () => this.quiz() });
  }

  gotIt() {
    this.word?.gotIt();
    this.nextWord();
  }

  again() {
    this.word?.again();
    this.nextWord();
  }

  nextWord() {
    this.word = this.wordService.nextWord();
    this.pinyin = pinyin[this.word.simplified as keyof typeof pinyin];
    this.definition = definitions[this.word.simplified as keyof typeof definitions];
    this.complete = false;
    this.characterIndex = 0;
    this.setCharacters();
    this.quiz();
  }

  setCharacters() {
    if (this.word === undefined) return;
    const done = this.word.simplified.substring(0, this.characterIndex);
    const todo = '_'.repeat(this.word.simplified.length - this.characterIndex);
    this.characters = done + todo;
  }

  quiz(): void {
    this.writer.setCharacter(this.word?.simplified[this.characterIndex]);
    this.writer.quiz({
      onComplete: (summaryData: any) => {
        this.characterIndex += 1;
        this.setCharacters();
        if (this.characterIndex === this.word?.simplified.length) {
          this.complete = true;
        } else {
          this.quiz();
        }
      },
      onCorrectStroke: (strokeData: any) => {
        this.hideOutline();
      },
    });
  }
}
