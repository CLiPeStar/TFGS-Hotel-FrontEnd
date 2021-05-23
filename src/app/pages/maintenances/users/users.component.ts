import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from 'src/app/core/models/users.models';
import {UsuarioService} from 'src/app/services/usuario.service';
import {SearchService} from "../../../services/search.service";
import Swal from "sweetalert2";
import {ModalImgService} from "../../../services/modal-img.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public pageSince: number = 0;
  public charging: boolean = true
  private imgSubs: Subscription;
  userTemp:User;

  constructor(private userService: UsuarioService, private searchService: SearchService, private modalService: ModalImgService) {
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.chargeUser()
    this.imgSubs = this.modalService.newImg.pipe(delay(100)).subscribe(img => {
     this.userTemp.img=img;
    })
  }

  changeSheet(value: number) {
    this.pageSince += value
    if (this.pageSince <= 0) {
      this.pageSince = 0
    } else if (this.pageSince >= this.totalUsers - 5) {
      this.pageSince = this.totalUsers - 5
    }
    this.chargeUser()
  }

  chargeUser() {
    this.charging = true
    this.userService.chargeUsers(this.pageSince).subscribe((data: any) => {
      const {total, user} = data;
      this.users = user;
      this.totalUsers = total;
      this.charging = false

    });
  }

  search(chain: string) {
    this.charging = true

    if (chain.length === 0) {
      this.chargeUser()
      return
    }

    this.searchService.search('users', chain).subscribe((res) => {
      this.charging = false
      this.users = res;
    })
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.getUser.uid) {
      Swal.fire(
        'Error!',
        "You can't delete yourself",
        'error'
      )
      return;
    }


    Swal.fire({
      title: 'Delete user?',
      text: `you are going to erase ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((res) => {
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          )
          this.chargeUser()
        }, (err) => {
          Swal.fire(
            'Error!',
            err.error.error,
            'error'
          )
        })

      }
    })
  }

  changeRole(user: User) {
    this.userService.saveUser(user).subscribe((res) => {
      console.log(res)

    })
  }

  openModal(user: User) {
    this.userTemp=user;
    this.modalService.openModal('users', user.uid, user.getImage)
  }
}
