import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios();
    // const promesa = new Promise((resolve, reject) => {
    //   resolve('Hola mundo');
    // });
    // promesa.then((data) => {
    //   console.log(data);
    // });
    // console.log('fin del init');
  }

  getUsuarios() {
    fetch('https://reqres.in/api/users')
      .then((data) => data.json())
      .then((body) => console.log(body.data));
  }
}
