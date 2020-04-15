import { Injectable } from '@angular/core';
import {School} from '../models/School.module';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  schools: School[] = [];
  schoolSubject = new Subject<School[]>() ;
  url = 'http://localhost:8080/school';
  constructor(private  http: HttpClient) { }

  emitSchoolSubject() {
    this.schoolSubject.next(this.schools);
  }

  createNewSchool(school: School) {
    this.schools.push(school);
    this.emitSchoolSubject();
    return this.http.post<boolean>(this.url + '/add' , school ).subscribe(
      (data) => {
        this.getSchools();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getSchools() {
    this.http.get<School[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.schools = data;
        this.emitSchoolSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getSchoolById(id: ObjectID) {
    const school = this.schools.find(
      (s) => {
        return s.id === id;
      }
    );
    return school;
  }
  deleteSchool(id: ObjectID) {
    const index = this.schools.indexOf(this.getSchoolById(id));
    this.schools.splice(index, 1);
    this.emitSchoolSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getSchools();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateSchool(school: School) {
    this.http
      .put<any>(this.url + '/update', school)
      .subscribe(
        () => {
          this.getSchools();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getSchoolList() {
    this.getSchools();
    return this.schools;
  }
}
