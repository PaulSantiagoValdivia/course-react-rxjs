import { fromEvent } from "rxjs";
const letterRows = document.getElementsByClassName('letter-row');
const onKeyDown$ = fromEvent(document, "keydown");
let letterIndex=0;
let letterRowIndex=0;
let userAnswer=[];
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
    event.key? 'Enter':false;
    
  }
}

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWorld);
