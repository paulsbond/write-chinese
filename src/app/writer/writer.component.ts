import { Component } from '@angular/core';
import pinyin from '../data/pinyin.json';
import definitions from '../data/definitions.json';
import { SchedulerService } from '../services/scheduler.service';
declare var HanziWriter: any;

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent {
  writer: any;
  word: string = '';
  pinyin: string = '';
  definition: string = '';
  complete: boolean = false;
  characters: string = '';
  characterIndex: number = 0;
  outlineShown: boolean = false;

  constructor(private schedulerService: SchedulerService) {}

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
    this.schedulerService.schedule(this.word);
    this.nextWord();
  }

  again() {
    this.schedulerService.schedule(this.word, true);
    this.nextWord();
  }

  nextWord() {
    this.word = this.schedulerService.nextWord();
    this.pinyin = pinyin[this.word as keyof typeof pinyin];
    this.definition = definitions[this.word as keyof typeof definitions];
    this.complete = false;
    this.characterIndex = 0;
    this.setCharacters();
    this.quiz();
  }

  setCharacters() {
    if (this.word === undefined) return;
    const done = this.word.substring(0, this.characterIndex);
    const todo = '_'.repeat(this.word.length - this.characterIndex);
    this.characters = done + todo;
  }

  quiz(): void {
    this.writer.setCharacter(this.word[this.characterIndex]);
    this.writer.quiz({
      onComplete: (summaryData: any) => {
        this.characterIndex += 1;
        this.setCharacters();
        if (this.characterIndex === this.word.length) {
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
