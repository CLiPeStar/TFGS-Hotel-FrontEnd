import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Subscriber, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [],
})
export class BreadCrumbsComponent implements OnInit, OnDestroy {
  title: string = '';
  titleSubs$: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getDataRoute().subscribe(({title}) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((e) => e instanceof ActivationEnd),
      filter((e: ActivationEnd) => e.snapshot.firstChild === null),
      map((e: ActivationEnd) => e.snapshot.data)
    );
  }
}
