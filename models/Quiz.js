export class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.questionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }

    validateAndContinue(answer) {
        this.getCurrentQuestion().saveAnswer(answer);
        this.questionIndex++;
    }

    isEnded() {
        return this.questions.length === this.questionIndex
    }

}