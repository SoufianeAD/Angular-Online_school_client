import { Component, OnInit } from '@angular/core';
import {ClassRoom} from "../../models/ClassRoom.module";
import {Subscription} from "rxjs";
import {ClassRoomService} from "../../services/class-room.service";

@Component({
  selector: 'app-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.scss']
})
export class ListClassroomComponent implements OnInit {

  list: ClassRoom[] = [];
  listSubscription: Subscription;

  constructor(public classroomService: ClassRoomService) { }

  ngOnInit(): void {
    this.listSubscription = this.classroomService.classRoomSubject.subscribe(
      (classrooms: ClassRoom[]) => {
        this.list = classrooms;
      }
    );
    this.classroomService.getClassRooms();
  }

}
