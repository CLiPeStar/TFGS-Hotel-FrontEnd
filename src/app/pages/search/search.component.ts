import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/core/models/users.models';
import {SearchService} from "../../services/search.service";
import {Hotel} from "../../core/models/hotel.models";
import {Receptionists} from "../../core/models/receptionists.models";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  users: User[] = []
  hotels: Hotel[] = []
  receptionists: Receptionists[] = []

  constructor(private activatedRouter: ActivatedRoute, private searchService: SearchService
    , private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({chain}) => {
      this.searchGlobal(chain)
    });
  }


  searchGlobal(chain) {
    this.searchService.globalSearch(chain).subscribe((data: any) => {
      console.log(data)
      this.users = data.users
      this.hotels = data.hotels
      this.receptionists = data.receptionists
    })
  }

  openReceptionist(receptionist: Receptionists) {
    this.router.navigateByUrl(`/dashboard/receptionist/${receptionist._id}`)
  }
}
