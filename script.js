const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex =0;
let mistake =0;
let isTyping =false;

function loadParagraph(){
    
    const paragraph = ["There is no security on this earth, there is only opportunity.","Computer dating is fine, if you are a computer",
    "The project was completed ahead of schedule thanks to the team's hard work.",
    "He was thrilled to receive the news that he had been accepted into the university of his dreams .",
    
    "She carefully packed her bags, making sure not to forget any essentials.",
    "In a world where technology evolves rapidly, it is important to stay informed and continuously adapt to new developments."];


    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML ='';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{input.focus()});
}

function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft >0)
    {

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            mistake++ ;
            char[charIndex].classList.add('incorrect');
        }
        
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex -mistake;
    }
    else{
        clearInterval(timer);
        input.value ='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        const wp = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wp;
    }
    else{
        clearInterval(timer);
    }
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
function reset(){
    loadParagraph();
    clearInterval(timer);
    charIndex = 0;
    input.value = '';
    timeLeft = maxTime;
    time.innerText = timeLeft;
    mistake = 0;
    isTyping =false;
    wpm.innerText= 0;
    cpm.innerText = 0;
    mistakes.innerText =0;

}

loadParagraph();