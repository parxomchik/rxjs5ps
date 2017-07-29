import { Observable } from 'rxjs';

export function load(url) {
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

export function loadWithFetch(url: string) {
    return Observable.defer(() => {
        return Observable.fromPromise(fetch(url).then(r => {
                if (r.status === 200) {
                   return r.json()
                } else {
                    return Promise.reject(r);
                }
            }
        ));
    })
}