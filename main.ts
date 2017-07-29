import { Observable } from 'rxjs';
import { loadWithFetch } from './loaders';
import './main.css';

let output = document.getElementById('output');
let button = document.getElementById('button');
let click = Observable.fromEvent(button, 'click');

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}



loadWithFetch('movies.json')
        .subscribe(
            renderMovies,
            e => console.log(`error ${e}`),
            () => console.log('Complete')
        )

click
    .flatMap(e => loadWithFetch('movies.json'))
    .subscribe(
        renderMovies,
        e =>  console.log(`Error ${e}`),
        () =>  console.log('compleate')
    );
