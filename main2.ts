import { Observable } from 'rxjs';
import './main.css';
let circle = document.getElementById('circle');
let source = Observable.fromEvent(document, 'mousemove')
                        .map((e: MouseEvent) => {
                            return {
                                x: e.clientX,
                                y: e.clientY
                            }
                        })
                        .filter(value => value.x < 500)
                        .delay(300);

function onNext(value) {
    circle.style.left = value.x + 'px';
    circle.style.top = value.y + 'px';
}

source.subscribe(
    onNext,
    e =>  console.log(`Error ${e}`),
    () =>  console.log('compleate')
);
