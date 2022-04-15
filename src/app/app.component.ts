import { Component } from '@angular/core';
declare var HanziWriter: any;

class Word {
  constructor(
    public simplified: string,
    public traditional: string,
    public sounds: string,
    public pinyin: string,
    public definition: string,
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  writer: any;

  ngOnInit() {
    this.writer = new HanziWriter('grid-background-target', {
      width: 100,
      height: 100,
      padding: 0,
      showCharacter: false,
      showOutline: false,
      highlightOnComplete: false,
      drawingWidth: 30,
    });
  }

  words = [
    new Word("的", "的", "de5", "de", "indicates possession, like adding 's to a noun"),
    new Word("我", "我", "wo3", "wǒ", "I; me"),
    new Word("你", "你", "ni3", "nǐ", "you (singular)"),
  ];

  quiz(word: Word): void {
    this.writer.setCharacter(word.simplified);
    this.writer.quiz({
        onMistake: function (strokeData: any) {
            console.log('Oh no! you made a mistake on stroke ' + strokeData.strokeNum);
            console.log("You've made " + strokeData.mistakesOnStroke + " mistakes on this stroke so far");
            console.log("You've made " + strokeData.totalMistakes + " total mistakes on this quiz");
            console.log("There are " + strokeData.strokesRemaining + " strokes remaining in this character");
        },
        onCorrectStroke: function (strokeData: any) {
            console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
            console.log('You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke');
            console.log("You've made " + strokeData.totalMistakes + ' total mistakes on this quiz');
            console.log('There are ' + strokeData.strokesRemaining + ' strokes remaining in this character');
        },
        onComplete: function (summaryData: any) {
            console.log('You did it! You finished drawing ' + summaryData.character);
            console.log('You made ' + summaryData.totalMistakes + ' total mistakes on this quiz');
        }
    });
  
  }
}
