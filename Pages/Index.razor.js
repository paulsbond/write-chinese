export function showCharacter() {
    var writer = HanziWriter.create('grid-background-target', '我', {
        width: 100,
        height: 100,
        padding: 2,
        showCharacter: false,
        showOutline: false,
        highlightOnComplete: false,
        drawingWidth: 30,
    });
    writer.quiz({
        onMistake: function (strokeData) {
            console.log('Oh no! you made a mistake on stroke ' + strokeData.strokeNum);
            console.log("You've made " + strokeData.mistakesOnStroke + " mistakes on this stroke so far");
            console.log("You've made " + strokeData.totalMistakes + " total mistakes on this quiz");
            console.log("There are " + strokeData.strokesRemaining + " strokes remaining in this character");
        },
        onCorrectStroke: function (strokeData) {
            console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
            console.log('You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke');
            console.log("You've made " + strokeData.totalMistakes + ' total mistakes on this quiz');
            console.log('There are ' + strokeData.strokesRemaining + ' strokes remaining in this character');
        },
        onComplete: function (summaryData) {
            console.log('You did it! You finished drawing ' + summaryData.character);
            console.log('You made ' + summaryData.totalMistakes + ' total mistakes on this quiz');
        }
    });
}
