const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

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
    'programm',
    'game',
    'hand',
    'helmet',
    'pencil',
    'skill'
];
let randomWord;
let score = 0;
let time = 10;
let difficulty = 
sessionStorage.getItem('difficulty') !== null 
? sessionStorage.getItem('difficulty')
: 'medium';

difficultySelect.value = 
sessionStorage.getItem('difficulty') !== null 
? sessionStorage.getItem('difficulty')
: 'medium';
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
    <button onclick="location.reload()" id="restart">Reload</button>`;
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
        switch (difficulty) {
            case 'hard': time+=2;
            break;
            case 'middle': time+=4;
            break;
            case 'easy': time+=6;
            break;
        }
        
       /*if (difficultySelect==='hard') {
        time+=2;
       }
       if (difficultySelect==='middle') {
        time+=4;
       } else {
        time+=6;
       }
       */
        updateTime();
    }
})
settingsForm.addEventListener('change', (e)=>{
    console.log(e.target.value);
    difficulty = e.target.value;
    sessionStorage.setItem('difficulty', difficulty);
    text.focus();
})