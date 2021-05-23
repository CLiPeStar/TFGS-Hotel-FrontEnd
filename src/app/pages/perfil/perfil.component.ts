import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from 'src/app/services/usuario.service';
import {User} from "../../core/models/users.models";
import {FileUploadService} from "../../services/file-upload.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User
  public imgUpload: File;
  public imgTemp: string | ArrayBuffer = null

  constructor(private userService: UsuarioService, private fb: FormBuilder, private fileUploadService: FileUploadService) {
    this.user = userService.getUser
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe((res: any) => {
      const {email, name} = res.user
      Swal.fire('Profile uploaded', '', 'success');
      this.userService.getUser.email = email;
      this.userService.getUser.name = name;
    },(err)=>{
      Swal.fire('Error', err.error.error, 'error');

    })
  }

  changeImg(event: any) {
    let file = event.target.files[0]
    this.imgUpload = file
    if (!file){
      this.imgTemp=null
      return;}
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.imgTemp=reader.result
    }
  }

  uploadImg() {
    this.fileUploadService.updatePhoto(this.imgUpload, 'users', this.user.uid)
      .then((data) => {
        this.user.img = data
        Swal.fire('Photo uploaded', '', 'success');
      }).catch((err) => {
      Swal.fire('Error', err.error.error, 'error');
    })

  }
}
