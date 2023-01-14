import { fromEvent, Subject } from 'rxjs';
import WORDS_LIST from './wordsList.json'

const letterRows = document.getElementsByClassName('letter-row');
const onKeyDown$ = fromEvent(document, "keydown");
let letterIndex=0;
let letterRowIndex=0;
let userAnswer=[];
const getRandomWord=() => WORDS_LIST[Math.floor(Math.random()* WORDS_LIST.length)]
let rigthWord = getRandomWord();
console.log(rigthWord);

const userWindOrLoose$ = new Subject();

const insertLetter = {
  next: (event) => {
    const pressedKey = event.key;  
    if(pressedKey.length == 1 && pressedKey.match(/[a-z]/i)){
      let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      userAnswer.push(pressedKey);
      letterIndex++;
    }
  },
};

const checkWorld ={
  next: (event)=>{
    if(event.key =="Enter"){
      if(userAnswer.join("") == rigthWord){
        userWindOrLoose$.next("win");
      }
    }
    
  }
}

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWorld);
userWindOrLoose$.subscribe((value) =>{
  let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
      console.log(letterRowsWinned);
})