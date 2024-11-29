function disableAnswers(){
    let options = document.getElementsByName("option");
    let labels = document.getElementsByClassName(`ans-label`);
    for(let x = 0; x < options.length; x++){
        document.getElementById(`answer-${x}`).disabled = true;
        labels[x].style.cursor = 'not-allowed';
    }
    btnEnable('next');
}

// potekel čas
function tooSlow(){
    messageBox.style.color = "var(--red)";
    chosen = 'none';
    wrongAnsDisp();
    document.getElementById('noTimeLeft').style.display = 'block';
    document.getElementById('answerList').setAttribute('class', 'outOfTimeTrans');
    disableAnswers();
}

// prikaže pravilno številko vprašanja
function updateQuestionNumber(x){
    x++;
    // +1 zato da je napis od 1 do 10, questionNum je array index zato je od 0 do 9
    document.getElementById("questionNum").innerHTML = x + 1; 
    return x;
}

// prikaže spročilo za napačen odgovor
function wrongAnsDisp(){
    if(chosen != 'none'){
        document.getElementById(`li-${chosen}`).classList.add('wrong');
    }
    document.getElementById('noTimeLeft').style.display = 'none';
    message.innerHTML = `Correct answer is <span class="big extraBold">${questionsJSON.results[questionNum].correct_answer}</span>`;
    messageBox.style.color = "var(--red)";
    
}