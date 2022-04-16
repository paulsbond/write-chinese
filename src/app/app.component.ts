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
      onMistake: function (strokeData: any) {
        console.log('Oh no! you made a mistake on stroke ' + strokeData.strokeNum);
        console.log(
          "You've made " +
            strokeData.mistakesOnStroke +
            ' mistakes on this stroke so far'
        );
        console.log(
          "You've made " + strokeData.totalMistakes + ' total mistakes on this quiz'
        );
        console.log(
          'There are ' +
            strokeData.strokesRemaining +
            ' strokes remaining in this character'
        );
      },
      onCorrectStroke: function (strokeData: any) {
        console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
        console.log(
          'You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke'
        );
        console.log(
          "You've made " + strokeData.totalMistakes + ' total mistakes on this quiz'
        );
        console.log(
          'There are ' +
            strokeData.strokesRemaining +
            ' strokes remaining in this character'
        );
      },
      onComplete: function (summaryData: any) {
        console.log('You did it! You finished drawing ' + summaryData.character);
        console.log(
          'You made ' + summaryData.totalMistakes + ' total mistakes on this quiz'
        );
      },
    });
  }
}
