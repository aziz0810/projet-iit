document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active');

        const descriptionId = this.getAttribute('data-description');
        const description = document.getElementById(descriptionId);

        document.querySelectorAll('.desc').forEach(desc => {
            desc.style.display = 'none';
        });

        description.style.display = 'block';

        const detailBox = document.getElementById('detail-box');
        detailBox.innerHTML = description.innerHTML;
    });
});
function toggleDetails(id) {
    const details = document.getElementById(id);
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        setTimeout(() => {
            details.style.display = "none";  
        }, 500); 
    } else {
        details.style.display = "block";  
        setTimeout(() => {
            details.classList.add('show');  
        }, 10);
    }
}


const correctAnswers = {
    q1: 'a',  
    q2: 'c',  
    q3: 'c',  
    q4: 'b',  
    q5: 'c',  
    q6: 'a',  
    q7: 'b',  
    q8: 'a',  
    q9: 'd',  
    q10: 'b', 
};

let currentQuestion = 1;
const totalQuestions = 10;
const scoreElement = document.getElementById("score");
const resultsContainer = document.getElementById("results");
const incorrectAnswersList = document.getElementById("incorrect-answers");
const nextButton = document.getElementById("next-btn");

function showQuestion(questionNumber) {
    const questions = document.querySelectorAll(".question");
    questions.forEach((question, index) => {
        question.style.display = (index + 1 === questionNumber) ? "block" : "none";
    });
}

function submitQuiz() {
    let score = 0;
    let incorrectAnswerList = [];

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);

        if (selectedAnswer) {
            const userAnswer = selectedAnswer.value;
            if (userAnswer === correctAnswers[`q${i}`]) {
                score++;
            } else {
                incorrectAnswerList.push(`Question ${i}: Vous avez répondu '${userAnswer}', mais la bonne réponse était '${correctAnswers[`q${i}`]}'.`);
            }
        } else {
            incorrectAnswerList.push(`Question ${i}: Aucune réponse sélectionnée.`);
        }
    }

    displayResults(score, incorrectAnswerList);
}

function displayResults(score, incorrectAnswerList) {
    document.getElementById('quiz-form').style.display = 'none';
    nextButton.style.display = 'none';

    scoreElement.textContent = `Votre score est: ${score} sur ${totalQuestions}`;

    if (score === 10) {
        scoreElement.textContent += " Bravo, vous êtes un vrai fan de football ! 🎉";
    }

    incorrectAnswersList.innerHTML = '';
    incorrectAnswerList.forEach(answer => {
        const listItem = document.createElement('li');
        listItem.textContent = answer;
        incorrectAnswersList.appendChild(listItem);
    });

    resultsContainer.style.display = 'block';

    const retryButton = document.createElement('button');
    retryButton.textContent = "Réessayer";
    retryButton.onclick = () => location.reload(); 
    resultsContainer.appendChild(retryButton);
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        submitQuiz();
    }
}

showQuestion(currentQuestion);

nextButton.addEventListener("click", () => {
    nextQuestion();
});
