import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSub: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry())
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (err) => console.warn(err),
    //     () => console.info('Obs terminado')
    //   );

    this.intervalSub = this.retornaIntervalo().subscribe((valor) =>
      console.log(valor)
    );
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }
  retornaIntervalo() {
    const interval$ = interval(100).pipe(
      // take(10),
      map((valor) => valor + 1),
      filter((valor2) => valor2 % 2 == 0)
    );
    return interval$;
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
