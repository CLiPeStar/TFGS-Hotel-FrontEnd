import {Component, OnInit} from '@angular/core';
import {ModalImgService} from "../../services/modal-img.service";
import {FormGroup} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {User} from "../../core/models/users.models";
import Swal from "sweetalert2";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: []
})
export class ModalImgComponent implements OnInit {
  public imgUpload: File;
  public imgTemp: string | ArrayBuffer = null

  constructor(public modalService: ModalImgService, private userService: UsuarioService, private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModel()
    this.imgTemp=null
  }

  changeImg(event: any) {
    let file = event.target.files[0]
    this.imgUpload = file
    if (!file) {
      this.imgTemp = null
      return;
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  uploadImg() {
    const id = this.modalService.id
    const type = this.modalService.type
    const img= this.modalService.img
    this.fileUploadService.updatePhoto(this.imgUpload, type, id)
      .then((data) => {
        Swal.fire('Photo uploaded', '', 'success');
        this.modalService.newImg.emit(data)
        this.closeModal()
      }).catch((err) => {
      Swal.fire('Error', err.error.error, 'error');
    })

  }

}
