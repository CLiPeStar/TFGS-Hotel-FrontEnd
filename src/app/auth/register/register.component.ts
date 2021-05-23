import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terms: [false, [Validators.required]],
    },
    {
      validators: this.passwordEquals('password', 'password2'),
    }
  );
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid || !this.registerForm.get('terms').value) {
      return;
    }

    //Subir user
    this.usuarioService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        //Si sucede un error

        Swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  fieldNotValid(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordNotValid(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 != pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordEquals(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
