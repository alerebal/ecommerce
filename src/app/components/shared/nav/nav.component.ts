import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

}
