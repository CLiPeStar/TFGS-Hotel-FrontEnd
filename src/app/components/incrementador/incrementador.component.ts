import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  // @Input('valor') progress: number = 40;
  @Input() progress: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  cambiarValor(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.changeValue.emit(100);
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && value <= 0) {
      this.changeValue.emit(0);

      this.progress = 0;
      return;
    }
    this.progress = this.progress + value;
    this.changeValue.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.changeValue.emit(value);
  }
}
