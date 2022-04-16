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
    this.word = this.wordService.nextWord();
    this.quiz();
  }

  quiz(): void {
    this.writer.setCharacter(this.word?.simplified);
    this.writer.quiz({
      onComplete: function (summaryData: any) {
        console.log('You did it! You finished drawing ' + summaryData.character);
        console.log('You made ' + summaryData.totalMistakes + ' total mistakes');
      },
    });
  }
}
