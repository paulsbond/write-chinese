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
    this.quiz();
  }

  good() {
    this.word?.good();
    this.quiz();
  }

  again() {
    this.word?.again();
    this.quiz();
  }

  quiz(): void {
    this.word = this.wordService.nextWord();
    this.complete = false;
    this.writer.setCharacter(this.word?.simplified);
    this.writer.quiz({
      onComplete: (summaryData: any) => {
        this.complete = true;
      },
    });
  }
}
