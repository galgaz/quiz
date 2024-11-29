// iz serverja dobi vprašanje in ga prikaže
async function getQuestions(e){
    document.getElementById('answerList').setAttribute('class', '');
    const response = await fetch(apiUrl, {
        method: 'GET'
    });
    questionsJSON = await response.json();
    nextQuestion();
    return 0;
}

async function nextQuestion(e){
    document.getElementById('answerList').setAttribute('class', '');
    if(questionNum < totalQuestions-1){
        // odstrani ostanke prejsnjih vprašanj začne timer in prikaže št vprašanja
        message.innerHTML = "";
        btnEnable('confirm');
        clearInterval(questionTimer);
        startTimer();
        questionNum = updateQuestionNumber(questionNum);
    
        // prikaže vprašanje in lastnosti
        document.getElementById("vprasanje").innerHTML = questionsJSON.results[questionNum].question;
        document.getElementById('category').innerHTML = questionsJSON.results[questionNum].category;
    
        // odstrani prejsnje odgovore
        const ansList = document.getElementById("answerList");
        while(ansList.firstChild){ 
            ansList.removeChild(ansList.firstChild);
        }        
        answers.length = 0;

        // prikaze odgovore
        function addNewAnswer(id){
            let answer  = answers[id];
            let listItem = document.createElement("li");
            listItem.innerHTML = 
            `<input type="radio" id="answer-${id}" class="radioInput" name="option" value="${id}">
                <label for="answer-${id}" class="ans-label big bold">${answer}</label>
            </input>`;
            listItem.setAttribute('id', `li-${id}`);
            listItem.addEventListener("change", () => {btnEnable('confirm')});    
            ansList.appendChild(listItem);
        }
        answers[0] = questionsJSON.results[questionNum].correct_answer;
        for(let i = 0; i < questionsJSON.results[questionNum].incorrect_answers.length; i++){
            answers[i+1] = questionsJSON.results[questionNum].incorrect_answers[i];
        }

        // premeša odgovore (razen če so T/F)
        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                let temp = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temp;
            }
        }

        // če ima vprašanje 4 odgovore, jih naključno pomeša
        // če sta samo 2 odgovora (T/F), jih da v zaporedje True, False
        if(questionsJSON.results[questionNum].type == 'multiple'){
            shuffle(answers);
        }
        else{
            if(answers[0] == 'False'){
                let temp = answers[0];
                answers[0] = answers[1];
                answers[1] = temp;
            }
        }

        for(let i = 0; i < answers.length; i++){
            addNewAnswer(i);
        }
    
        // onemogoči gumb za novo vprašanje
        btnHide();
    }
    else{
        window.location.replace(`result.html?score=${score}`);
    }
    return 0;
}

/*
preveri pravilnost odgovora in prikaže rezultat
*/
async function confirmAnswer(e){
    clearInterval(questionTimer);

    // poišče izbrani odgovor
    let options = document.getElementsByName("option");
    let i;
    chosen = -1;
    for(i = 0; i < options.length; i++){
        if(options[i].checked){
            chosen = i;
        }
    }

    // prikaže pravilnost odgovora in prišteje točke
    if(answers[chosen] == questionsJSON.results[questionNum].correct_answer){
        document.getElementById('noTimeLeft').style.display = 'none';
        message.innerHTML = '<span class="big bold">You are right!<span>';
        document.getElementById(`li-${chosen}`).classList.add('correct');
        let newScore = 85 + timeLeft;
        if(newScore > 100){
            newScore = 100;
        }
        score += newScore;
        document.getElementById("scoreNum").innerHTML = score;
        messageBox.style.color = "var(--blue)";
    }
    else{
        wrongAnsDisp();
    }
    // onemogoči spremembo odgovora, pokaže gumb za novo vprašanje
    disableAnswers();
    return 0;
}