import {Component, OnDestroy, OnInit} from '@angular/core';
import {HotelsService} from "../../../services/hotels.service";
import {Hotel} from "../../../core/models/hotel.models";
import {delay, switchAll} from "rxjs/operators";
import Swal from "sweetalert2";
import {ModalImgService} from "../../../services/modal-img.service";
import {Subscription} from "rxjs";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styles: []
})
export class HotelsComponent implements OnInit, OnDestroy {
  public hotels: Hotel[] = [];
  public charged: boolean = true;
  private imgSubs: Subscription;
  hotelTemp:Hotel;

  constructor(private hotelService: HotelsService, private modalService: ModalImgService,private searchService: SearchService) {
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.chargeHotels()
    this.imgSubs = this.modalService.newImg.pipe(delay(100)).subscribe(img => {
      this.hotelTemp.img=img
    })
  }


  chargeHotels() {
    this.charged = true
    this.hotelService.chargeHotels().subscribe((res) => {
      this.charged = false
      this.hotels = res
    })
  }

  saveChange(hotel: Hotel) {
    this.hotelService.updateHotel(hotel.name, hotel._id).subscribe((res) => {
      Swal.fire('Updated', 'Hotel update', "success")
    })
  }

  deleteHotel(hotel: Hotel) {
    this.hotelService.deleteHotel(hotel._id).subscribe((res) => {
      Swal.fire('Deleted', 'Hotel deleted', "success")
      this.chargeHotels()

    })
  }

  async newHotel() {
    const {value = ''} = await Swal.fire<string>({
      title: 'New hotel',
      input: 'text',
      inputLabel: 'Name Hotel',
      inputPlaceholder: 'Enter the hotel name',
      showCancelButton: true
    })

    if (value.trim().length > 0) {
      this.hotelService.createHotel(value).subscribe((res: any) => {
        Swal.fire('Created', 'Hotel created', "success")
        this.hotels.push(res.hotel)
      })
    }
  }

  openModal(hotel: Hotel) {
    this.hotelTemp=hotel;
    this.modalService.openModal('hotels', hotel._id, hotel.img)

  }
  search(chain: string) {
    this.charged = true

    if (chain.length === 0) {
      this.chargeHotels()
      return
    }

    this.searchService.search('hotels', chain).subscribe((res) => {
      this.charged = false
      this.hotels = res;
    })
  }
}
