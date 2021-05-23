import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImgComponent } from './modal-img/modal-img.component';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImgComponent],
  exports: [IncrementadorComponent, DonaComponent,ModalImgComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
