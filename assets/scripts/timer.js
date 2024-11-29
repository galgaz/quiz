/*
Timer za posamezen odgovor
timerTime določa čas timerja v sekundah
*/
let timeLeft, timerTime = 20;
var questionTimer = null;

function startTimer() {
    timeLeft = timerTime;
    updateTimer();
}

function updateTimer() {
    document.getElementById('timer').innerHTML = timeLeft + 's';
    if (timeLeft <= 0) {
        clearTimeout(questionTimer);
        tooSlow();
        return;
    }
    timeLeft -= 1;
    questionTimer = setTimeout(updateTimer, 1000);
}
