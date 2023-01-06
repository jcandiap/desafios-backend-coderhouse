export class UI {
    showQuestion(text) {
        const questionTitle = document.getElementById('question');
        questionTitle.innerText = text;
    }

    showChoises(choices, callback) {
        const choisesContainer = document.getElementById('choices');
        choisesContainer.innerHTML = '';
        for (let index = 0; index < choices.length; index++) {
            const button = document.createElement('button');
            button.innerText = choices[index];
            button.className = 'button';
            button.addEventListener('click', () => callback(choices[index]));
            choisesContainer.appendChild(button);
        }
    }

    endSurvey(quiz) {
        const quizEndHTML = `
            <h1>¡Gracias por responder la encuesta! 🥳</h1>
            <h4 class="ui-h4" id="show-answers-button">Ver respuestas 👀</h4>
            <div id="answers"></div>
            <button class="ui-button" id="restart-button">Volver a responder encuesta</button>
        `;
        const element = document.getElementById('quiz');
        element.innerHTML = quizEndHTML;
        this.restartSurvey();
        this.showResults(quiz);
    }

    restartSurvey() {
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', () => location.reload());
    }

    showResults(quiz) {
        const answersButton = document.getElementById('show-answers-button');
        const answers = document.getElementById('answers');
        
        answersButton.addEventListener('click', () => {
            if( answers.childNodes.length === 0 ) {
                answers.className = 'border mb-2';
                answersButton.innerText = 'Ocultar respuestas 🙈';
                quiz.questions.forEach((question) => {
                    const divAnswer = document.createElement('div');
    
                    const answerText = document.createElement('h3');
                    answerText.className = 'text-white';
                    answerText.innerText = question.text;
    
                    const choiceSelected = document.createElement('h4');
                    choiceSelected.className = 'text-primary';
                    choiceSelected.innerText = question.answer;
    
                    divAnswer.appendChild(answerText);
                    divAnswer.appendChild(choiceSelected);
    
                    answers.appendChild(divAnswer);
                });
            } else {
                answersButton.innerText = 'Ver respuestas 👀';
                answers.innerHTML = '';
                answers.className = '';
            }
        }); 
    }

    showProgress(currentIndex, total) {
        const element = document.getElementById('progress');
        element.innerHTML = `Pregunta ${ currentIndex } de ${ total }`;
    }
}