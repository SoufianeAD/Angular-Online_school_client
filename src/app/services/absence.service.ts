import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import ObjectID from 'bson-objectid';
import {Absence} from '../models/Absence.module';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  absences: Absence[] = [];
  absenceSubject = new Subject<Absence[]>() ;
  url = 'http://localhost:8080/absence';
  constructor(private  http: HttpClient) { }

  emitAbsenceSubject() {
    this.absenceSubject.next(this.absences);
  }

  createNewAbsence(absence: Absence) {
    this.absences.push(absence);
    this.emitAbsenceSubject();
    return this.http.post<boolean>(this.url + '/add' , absence ).subscribe(
      (data) => {
        this.getAbsences();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }
  getAbsences() {
    this.http.get<Absence[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.absences = data;
        this.emitAbsenceSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getAbsenceById(id: ObjectID) {
    const absence = this.absences.find(
      (abs) => {
        return abs.id === id;
      }
    );
    return absence;
  }
  deleteAbsence(id: ObjectID) {
    const index = this.absences.indexOf(this.getAbsenceById(id));
    this.absences.splice(index, 1);
    this.emitAbsenceSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getAbsences();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateAbsence(absence: Absence) {
    this.http
      .put<any>(this.url + '/update', absence)
      .subscribe(
        () => {
          this.getAbsences();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAbsenceList() {
    this.getAbsences();
    return this.absences;
  }
}
