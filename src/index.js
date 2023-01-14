import {fromEvent} from 'rxjs';
const onKeyDown$ =fromEvent (document, "keydown");

const observadorMouse={
  next: (event) =>{
    console.log(event.key);
  }
}; 
  onKeyDown$.subscribe(observadorMouse);