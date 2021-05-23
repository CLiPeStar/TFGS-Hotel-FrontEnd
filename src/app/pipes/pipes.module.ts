import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { imgPipe } from './imagen.pipe';

@NgModule({
  declarations: [imgPipe],
  exports: [imgPipe],
  imports: [CommonModule],
})
export class PipesModule {}
