import { fromEvent, Subject} from "rxjs";
import WORDS_LIST from "./wordsList.json";

const letterRows = document.getElementsByClassName("letter-row");
const messageText = document.getElementById('message-text');
const onKeyDown$ = fromEvent(document, "keydown");
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];
const getRandomWord = () =>
  WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
let rigthWord = getRandomWord();
console.log(rigthWord);

const userWindOrLoose$ = new Subject();

const insertLetter = {
  next: (event) => {
    const pressedKey = event.key;
    if (pressedKey.length == 1 && pressedKey.match(/[a-z]/i)) {
      let letterBox =
        Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      userAnswer.push(pressedKey);
      letterIndex++;
    }
  },
};

const checkWorld = {
  next: (event) => {
    if (event.key == "Enter") {
    
      if (userAnswer.length !== 5) {
        messageText.textContent = "¡Te faltan algunas letras!";
        return; // <- Este return nos permite parar la ejecución del observable
      }
      
      // También podemos cambiar el ciclo for/forEach/while en lugar de `userAnswer.map()`
      // 😊 Iteramos sobre las letras en índices `[0, 1, 2, 3, 4]`:
      userAnswer.map((_, i) => {
        let letterColor = "";
        let letterBox = letterRows[letterRowIndex].children[i];

        // 🔍 Verificamos si la posición de la letra del usuario coincide con la posición correcta
        // Si la letra no se encuentra, indexOf() devolverá -1 (ver línea 58)
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        let letterPosition = rigthWord.indexOf(userAnswer[i]);

        if (rigthWord[i] === userAnswer[i]) {
          letterColor = "letter-green"; // Pintar de verde 🟩 si coincide letra[posición]
        } else {
          if (letterPosition === -1) {
            letterColor = "letter-grey"; // Pintar de gris ⬜️ si no coincide letra o posición
          } else {
            letterColor = "letter-yellow"; // Pintar de amarillo 🟨 si coincide letra, pero no posición
          }
        }
        letterBox.classList.add(letterColor);
      });

      // 🔄 Cuando se haya completado la palabra, permite escribir en la siguiente fila:
      if (userAnswer.length === 5) {
        letterIndex = 0;
        userAnswer = [];
        letterRowIndex++;
      }

      // 💚 Ganas el juego si la respuesta del usuario coincide con la palabra correcta
      if (userAnswer.join("") === rigthWord) {
        userWindOrLoose$.next();
      }
    }
  },
};

const delateLetter = {
  next: (event) => {
    const pressedKey = event.key;
    if (pressedKey === "Backspace" && pressedKey.length !== 0 ) {
      let currentRow = letterRows[letterRowIndex];
      let letterBox = currentRow.children[letterIndex-1]
      letterBox.textContent="";
      letterBox.classList.remove('filled-letter');
      letterIndex--;
      userAnswer.pop();
    }
  },
};

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWorld);
onKeyDown$.subscribe(delateLetter);

userWindOrLoose$.subscribe(() => {
  let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  console.log(letterRowsWinned);
  for (let i = 0; i < 5; i++) {
    letterRowsWinned.children[i].classList.add("letter-green");
  }
});
