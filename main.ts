import { Observable, Observer } from 'rxjs';

let numbers = [ 1,2,5,19 ]

let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`value is ${value}`),
    e =>  console.log(`Error ${e}`),
    () =>  console.log('compleate')
);
