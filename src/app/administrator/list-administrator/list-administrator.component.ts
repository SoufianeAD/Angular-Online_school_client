import { Component, OnInit } from '@angular/core';
import {Administrator} from '../../models/Administrator.module';
import {Subscription} from 'rxjs';
import {AdministratorService} from '../../services/administrator.service';

@Component({
  selector: 'app-list-administrator',
  templateUrl: './list-administrator.component.html',
  styleUrls: ['./list-administrator.component.scss']
})
export class ListAdministratorComponent implements OnInit {

  list: Administrator[] = [];
  listSubscription: Subscription;

  constructor(public administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.listSubscription = this.administratorService.administratorSubject.subscribe(
      (administrators: Administrator[]) => {
        this.list = administrators;
      }
    );
    this.administratorService.getAdministrators();
  }

}
