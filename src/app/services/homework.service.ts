import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Homework} from '../models/Homework.module';


@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  homeworks: Homework[] = [];
  homeworkSubject = new Subject<Homework[]>() ;
  currentHomework: Homework = null;
  url = 'http://localhost:8080/homework';
  constructor(private  http: HttpClient) { }

  emitHomeworkSubject() {
    this.homeworkSubject.next(this.homeworks);
  }

  createNewHomework(homework: Homework) {
    this.homeworks.push(homework);
    this.emitHomeworkSubject();
    return this.http.post<boolean>(this.url + '/add' , homework );
  }
  getHomeworks() {
    this.http.get<Homework[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.homeworks = data;
        this.emitHomeworkSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getHomeworkById(id: number) {
    const homework = this.homeworks.find(
      (h) => {
        return h.id === id;
      }
    );
    return homework;
  }
  deleteHomework(id: number) {
    const index = this.homeworks.indexOf(this.getHomeworkById(id));
    this.homeworks.splice(index, 1);
    this.emitHomeworkSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getHomeworks();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateHomework(homework: Homework) {
    this.http
      .put<any>(this.url + '/update', homework)
      .subscribe(
        () => {
          this.getHomeworks();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getHomeworkList() {
    this.getHomeworks();
    return this.homeworks;
  }

  uploadFile(file: any) {
    console.log('it\'s a send file');
    this.http
      .post<any>( this.url + '/upload', file)
      .subscribe(
        () => {
          console.log(' file sent !');
        },
        (error) => {
          console.log('Erreur while sending file : ' + error);
        }
      );
  }

  downloadFile(fileName: string) {
    return this.http.get<any>(this.url + '/download/' + fileName);
  }
}
