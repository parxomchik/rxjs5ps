import { Observable } from 'rxjs';
import './main.css';
let output = document.getElementById('output');
let button = document.getElementById('button');
let click = Observable.fromEvent(button, 'click');

function load(url) {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest;

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    observer.next(data);
                    observer.complete();
                } else {
                    observer.error(xhr.statusText);
                }
            });

            xhr.open('GET', url);
            xhr.send();
    }).retryWhen(retryStratagy({ attemps: 3, delay: 1500}));
}

function retryStratagy({ attemps = 4, delay = 1000 }) {
    return function (errors)  { 
       return errors
            .scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 0)
            .takeWhile(acc => acc < attemps)
            .delay(delay); 
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

function loadWithFetch(url: string) {
    return Observable.defer(() => {
        return Observable.fromPromise(fetch(url).then(r => r.json()));
    })
}

loadWithFetch('movies.json').subscribe(renderMovies);

click
    .flatMap(e => loadWithFetch('movies.json'))
    .subscribe(
        renderMovies,
        e =>  console.log(`Error ${e}`),
        () =>  console.log('compleate')
    );
