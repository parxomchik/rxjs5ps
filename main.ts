import { Observable, Observer } from 'rxjs';

let numbers = [ 1,2,5,19 ]

let source = Observable.from(numbers);


class MyObserver implements Observer<number> {
    next(value) {
        console.log(`value is ${value}`);
    }

    error(e) {
        console.log(`Error ${e}`);
    }

    complete() {
        console.log('compleate');
    }
}

source.subscribe(new MyObserver());