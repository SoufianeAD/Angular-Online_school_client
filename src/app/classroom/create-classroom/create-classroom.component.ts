import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {School} from "../../models/School.module";
import {Subscription} from "rxjs";
import {ClassRoomService} from "../../services/class-room.service";
import {Router} from "@angular/router";
import {SchoolService} from "../../services/school.service";
import {ClassRoom} from "../../models/ClassRoom.module";

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.scss']
})
export class CreateClassroomComponent implements OnInit {

  createForm: FormGroup;
  list: School[] = [];
  listSubscription: Subscription;

  constructor(public classRoomService: ClassRoomService,
              public schoolService: SchoolService,
              private router: Router) { }

  ngOnInit(): void {
    this.init();
    this.listSubscription = this.schoolService.schoolSubject.subscribe(
      (schools: School[]) => {
        this.list = schools;
      }
    );
    this.schoolService.getSchools();
  }

  init(): void {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      school: new FormControl(this.list[1])
    });
  }

  onSubmit(): void {
    const classroom = new ClassRoom();
    classroom.name = this.createForm.get('title').value;
    classroom.level = this.createForm.get('level').value;
    this.classRoomService.createNewClassRoom(classroom);
    this.router.navigate(['/classroom/list']);
  }

}
