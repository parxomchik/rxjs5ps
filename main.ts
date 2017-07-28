import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

let numbers = [ 1,2,5,19 ]

let source = Observable.create(observer => {
    let index = 0;

    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 400);
        } else {
            observer.complete();
        }

    }

    produceValue();


}).map(n => n * 10)
  .filter(n => n > 15);

source.subscribe(
    value => console.log(`value is ${value}`),
    e =>  console.log(`Error ${e}`),
    () =>  console.log('compleate')
);
