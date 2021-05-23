import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private $themeLink = document.querySelector('#theme');

  constructor() {
    const theme = localStorage.getItem('theme') || 'purple-dark';
    const url = `./assets/css/colors/${theme}.css`;
    this.$themeLink.setAttribute('href', url);
  }

  changeColor(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.$themeLink.setAttribute('href', url);
    localStorage.setItem('theme', theme);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const $btnTheme = document.querySelector('.working');
    $btnTheme.classList.remove('working');
    const $newBtnTheme = document.querySelector(
      `[data-theme=${localStorage.getItem('theme')}]`
    );
    $newBtnTheme.classList.add('working');
  }
}
