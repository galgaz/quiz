function btnEnable(type){
    mainButton.style.opacity = '1';
    mainButton.style.cursor = 'pointer';  
    if(type == 'confirm'){
        mainButton.removeEventListener('click', nextQuestion);
        mainButton.addEventListener("click", confirmAnswer);
        mainButton.innerHTML = 'Confirm';
        newBox.setAttribute('class', '');
        messageBox.style.display = 'none';
    }
    else if(type == 'next'){
        mainButton.removeEventListener('click', confirmAnswer);
        mainButton.addEventListener("click", nextQuestion);
        mainButton.innerHTML = 'Next question';
        messageBox.style.display = 'flex';
        newBox.setAttribute('class', 'whiteTransBox');
    }
}

function btnHide(){
    mainButton.style.opacity = '0.5';
    mainButton.style.cursor = 'not-allowed';
    mainButton.removeEventListener("click", nextQuestion);
    mainButton.removeEventListener('click', confirmAnswer);
}
