import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent {
  // Doughnut
  @Input() title: string = 'Whitout title';
  @Input()
  doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet = [[]];
  @Input() colors: Colors[] = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
    },
  ];
}
