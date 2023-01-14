import {Observable} from 'rxjs';
const observableAlfa$= new Observable(suscriber =>{
  suscriber.next(1);
  suscriber.next(2);
  suscriber.next(3);
});

const observador ={
  next:(value) => {
    console.log(value);
  },
  complete:() => {},
  error:()=>{;}
};

observableAlfa$.subscribe(observador);