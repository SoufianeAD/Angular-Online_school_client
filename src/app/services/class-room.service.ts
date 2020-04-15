import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';
import {ClassRoom} from '../models/ClassRoom.module';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {

  classrooms: ClassRoom[] = [];
  classRoomSubject = new Subject<ClassRoom[]>() ;
  url = 'http://localhost:8080/classRoom';
  constructor(private  http: HttpClient) { }

  emitClassRoomSubject() {
    this.classRoomSubject.next(this.classrooms);
  }

  createNewClassRoom(classRoom: ClassRoom) {
    this.classrooms.push(classRoom);
    this.emitClassRoomSubject();
    return this.http.post<boolean>(this.url + '/add' , classRoom ).subscribe(
      (data) => {
        this.getClassRooms();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getClassRooms() {
    this.http.get<ClassRoom[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.classrooms = data;
        this.emitClassRoomSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getClassRoomById(id: ObjectID) {
    const classRoom = this.classrooms.find(
      (c) => {
        return c.id === id;
      }
    );
    return classRoom;
  }
  deleteClassRoom(id: ObjectID) {
    const index = this.classrooms.indexOf(this.getClassRoomById(id));
    this.classrooms.splice(index, 1);
    this.emitClassRoomSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getClassRooms();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateClassRoom(classRoom: ClassRoom) {
    this.http
      .put<any>(this.url + '/update', classRoom)
      .subscribe(
        () => {
          this.getClassRooms();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getClassRoomList() {
    this.getClassRooms();
    return this.classrooms;
  }
}
