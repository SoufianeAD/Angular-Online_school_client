import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FeedBack} from '../models/FeedBack.module';


@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  feedBacks: FeedBack[] = [];
  feedBackSubject = new Subject<FeedBack[]>() ;
  url = 'http://localhost:8080/feedBack';
  constructor(private  http: HttpClient) { }

  emitFeedBackSubject() {
    this.feedBackSubject.next(this.feedBacks);
  }

  createNewFeedBack(feedBack: FeedBack) {
    this.feedBacks.push(feedBack);
    this.emitFeedBackSubject();
    return this.http.post<FeedBack>(this.url + '/add' , feedBack );
  }
  getFeedBacks() {
    this.http.get<FeedBack[]>(this.url + '/getAll').subscribe(
      (data) => {
        alert(data);
        this.feedBacks = data;
        this.emitFeedBackSubject();
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getFeedBackById(id: number) {
    const feedBack = this.feedBacks.find(
      (fd) => {
        return fd.id === id;
      }
    );
    return feedBack;
  }
  deleteFeedBack(id: number) {
    const index = this.feedBacks.indexOf(this.getFeedBackById(id));
    this.feedBacks.splice(index, 1);
    this.emitFeedBackSubject();
    this.http.delete(this.url + '/delete/' + id)
      .subscribe(
        ()  => {
          this.getFeedBacks();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }

  updateFeedBack(feedBack: FeedBack) {
    this.http
      .put<any>(this.url + '/update', feedBack)
      .subscribe(
        () => {
          this.getFeedBacks();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getFeedBackList() {
    this.getFeedBacks();
    return this.feedBacks;
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

  getFeedBackByHomeworkIdAndStudentId(homeworkId: number, studentId: number) {
    return this.http.get<FeedBack>(this.url + '/getByHomeworkIdAndStudentId/' + homeworkId + '/' + studentId);
  }

  getFeedBackByHomeworkId(homeworkId: number) {
    return this.http.get<FeedBack[]>(this.url + '/getByHomeworkId/' + homeworkId);
  }
}
