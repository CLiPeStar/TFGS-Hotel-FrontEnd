import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelsService} from "../../../services/hotels.service";
import {Hotel} from "../../../core/models/hotel.models";
import {ReceptionistsService} from "../../../services/receptionists.service";
import Swal from "sweetalert2";
import {Receptionists} from "../../../core/models/receptionists.models";
import {ActivatedRoute, Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
})
export class ReceptionistComponent implements OnInit {

  public receptionistsForm: FormGroup
  public hotels: Hotel[] = []
  public hotelSelected: Hotel
  public receptionistSelected: Receptionists

  constructor(private  fb: FormBuilder, private  hotelService: HotelsService,
              private receptionistService: ReceptionistsService, private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.chargeReceptionist(id)
    })
    this
      .receptionistsForm = this.fb.group({
      name: ['', Validators.required],
      hotel: ['', Validators.required]
    })
    this
      .chargeHotels()

    this
      .receptionistsForm
      .get(
        'hotel'
      ).valueChanges
      .subscribe(
        (
          hotelId
        ) => {
          this
            .hotelSelected = this.hotels.find(hotel => hotel._id === hotelId)
        }
      )


  }

  chargeReceptionist(id) {
    if (id === 'new') return;


    this.receptionistService.getReceptionistById(id).pipe(delay(100))
      .subscribe((res) => {


          this.receptionistSelected = res
          this.hotelSelected = this.receptionistSelected.hotel
          const {name, hotel: {_id}} = this.receptionistSelected
          this.receptionistsForm.setValue({name, hotel: _id})

        }, (err) => {
          return this.router.navigateByUrl(`/dashboard/receptionists`)
        }
      )
  }

  chargeHotels() {
    this.hotelService.chargeHotels().subscribe((hotels: Hotel[]) => {
      console.log(hotels)
      this.hotels = hotels;
    })
  }


  saveData() {

    if (this.receptionistSelected) {
      const data = {...this.receptionistsForm.value, _id: this.receptionistSelected._id}
      this.updateData(data)
    } else {
      this.receptionistService.createReceptionists(this.receptionistsForm.value).subscribe((res: any) => {
        Swal.fire('Create Receptionist', '', "success")
        this.router.navigateByUrl(`/dashboard/receptionist/${res.receptionist._id}`)
      })
    }


  }

  updateData(data) {
    this.receptionistService.updateReceptionists(data).subscribe((res: any) => {
      Swal.fire('Updated Receptionist', '', "success")
    })
  }
}
