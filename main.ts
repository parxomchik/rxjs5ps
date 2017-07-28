import { Observable, Observer } from 'rxjs';

let numbers = [ 1,2,5,19 ]

let source = Observable.create(observer => {
    let index = 0;

    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }

    }

    produceValue();


});

source.subscribe(
    value => console.log(`value is ${value}`),
    e =>  console.log(`Error ${e}`),
    () =>  console.log('compleate')
);
