const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsForm = document.getElementById('settings-form');
const words = [
    'apple',
    'home',
    'earth',
    'difficult',
    'element',
    'inclusion',
    'cat',
    'parrot',
    'coding',
    'robot',
    'programm'
];
let randomWord;
let score = 0;
let time = 10;

text.focus();
const timeInterval = setInterval(updateTime, 1000);

function updateTime (){
    time--;
    timeEl.innerHTML = time + " s";
    if (time===0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    endgameEl.innerHTML = `
    <h1>Game over!</h1>
    <p>Your score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
    endgameEl.style.display = 'flex';
}

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)];
   
}

function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
    
}
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}
addWordToDOM();

text.addEventListener('input',e =>{
    console.log(e.target.value);
    let insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value='';
        time+=4;
        updateTime();
    }
})
