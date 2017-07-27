import { Observable, Observer } from 'rxjs';

let numbers = [ 1,2,5,19 ]

let source = Observable.create(observer => {
    for (let n of numbers) {
        observer.next(n);
    }

    observer.complete();
});

source.subscribe(
    value => console.log(`value is ${value}`),
    e =>  console.log(`Error ${e}`),
    () =>  console.log('compleate')
);
