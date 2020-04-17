import { Component, OnInit } from '@angular/core';
import {School} from '../../models/School.module';
import {Subscription} from 'rxjs';
import {SchoolService} from '../../services/school.service';

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.component.html',
  styleUrls: ['./list-school.component.scss']
})
export class ListSchoolComponent implements OnInit {
  list: School[] = [];
  listSubscription: Subscription;
  constructor(public schoolService: SchoolService) { }

  ngOnInit(): void {
    this.listSubscription = this.schoolService.schoolSubject.subscribe(
      (schools: School[]) => {
        this.list = schools;
      }
    );
    this.schoolService.getSchools();
  }

}
