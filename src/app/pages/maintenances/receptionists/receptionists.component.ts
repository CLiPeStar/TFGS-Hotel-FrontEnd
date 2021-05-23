import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReceptionistsService} from "../../../services/receptionists.service";
import {Hotel} from "../../../core/models/hotel.models";
import {Subscription} from "rxjs";
import {Receptionists} from "../../../core/models/receptionists.models";
import {delay} from "rxjs/operators";
import {ModalImgService} from "../../../services/modal-img.service";
import {SearchService} from "../../../services/search.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-receptionists',
  templateUrl: './receptionists.component.html',
  styles: []
})
export class ReceptionistsComponent implements OnInit, OnDestroy {
  public receptionists: Receptionists[] = [];
  public charged: boolean = true;
  private imgSubs: Subscription;
  receptionistsTemp:Receptionists;

  constructor(private receptionistsService: ReceptionistsService,private modalService: ModalImgService,private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.chargeReceptionists()
    this.imgSubs = this.modalService.newImg.pipe(delay(100)).subscribe(img => {
      this.receptionistsTemp.img=img
    })

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  chargeReceptionists(){
    this.charged = true
    this.receptionistsService.chargeReceptionists().subscribe((res) => {
      this.charged = false
      this.receptionists = res
    })
  }
  openModal(receptionist: Receptionists) {
    this.receptionistsTemp= receptionist;
    this.modalService.openModal('receptionists', receptionist._id, receptionist.img)

  }
  search(chain: string) {
    this.charged = true

    if (chain.length === 0) {
      this.chargeReceptionists()
      return
    }

    this.searchService.search('receptionists', chain).subscribe((res) => {
      this.charged = false
      this.receptionists = res;
    })
  }
  deleteReceptionist(receptionist:Receptionists){




    Swal.fire({
      title: 'Delete receptionist?',
      text: `you are going to erase ${receptionist.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.receptionistsService.deleteReceptionists(receptionist._id).subscribe((res) => {
          Swal.fire(
            'Deleted!',
            'Receptionist has been deleted.',
            'success'
          )
          this.chargeReceptionists()
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
}
