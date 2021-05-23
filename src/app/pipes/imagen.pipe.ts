import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const api_url = environment.base_url;
@Pipe({
  name: 'img',
})
export class imgPipe implements PipeTransform {
  transform(img: string, type: 'users' | 'receptionists' | 'hotels'): string {
    if (!img) return `${api_url}/uploads/${type}/96as74fd85Z`;
    if (img.includes('https')) {
      return img;
    }
    if (img) {
      return `${api_url}/uploads/${type}/${img}`;
    }
    return `${api_url}/uploads/${type}/96as74fd85Z`;
  }
}
