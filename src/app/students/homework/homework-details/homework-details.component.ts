import {Component, OnInit} from '@angular/core';
import {Homework} from '../../../models/Homework.module';
import {File} from '../../../models/File.module';
import {Subject} from 'rxjs';
import {HomeworkService} from '../../../services/homework.service';
import {FileService} from '../../../services/file.service';
import {FileType} from '../../../models/enums/FileType';
import {FeedBackService} from '../../../services/feed-back.service';
import {FeedBack} from '../../../models/FeedBack.module';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.scss']
})
export class HomeworkDetailsComponent implements OnInit {

  currentHomework: Homework;
  files: File[] = [];
  feedBackFiles: File[] = [];
  feedBackFilesSubject = new Subject<File[]>();
  filesSubject = new Subject<File[]>();
  constructor(private homeworkService: HomeworkService,
              private fileService: FileService,
              private feedBackService: FeedBackService,
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.refresh();
  }

  emit() {
    this.filesSubject.next(this.files);
  }

  emitFeedBack() {
    this.feedBackFilesSubject.next(this.feedBackFiles);
  }

  refresh() {
    this.currentHomework = this.homeworkService.currentHomework;
    this.fileService.getFilesByDocument(this.currentHomework).subscribe(
      (files) => {
        alert(files);
        this.files = files;
      }, (error) => {
        console.log('error' + error);
      }
    );
    this.emit();
    //
    this.feedBackService.getFeedBackByHomeworkId(this.currentHomework.id).subscribe(
      (feedbacks) => {
        this.fileService.getFilesByFeedBack(feedbacks[0]).subscribe(
          (files) => {
            this.feedBackFiles = files;
          }
        );
      }
    );
  }

  onUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.feedBackService.uploadFile(formData);
      const file = new File();
      file.document = null;
      file.type = FileType.FeedBack;
      file.title = event.target.files[0].name;
      //
      let feedBack: FeedBack = null;
      this.feedBackService.getFeedBackByHomeworkIdAndStudentId(this.currentHomework.id, 45).subscribe(
        (data: FeedBack) => {
          feedBack = data;
          alert('find feedback: ' + JSON.stringify(data));
        }, error => {
          console.log('error');
        }
      );
      if (feedBack !== null) {
        file.feedBack = feedBack;
      } else {
        feedBack = new FeedBack();
        feedBack.homework = this.currentHomework;
        /*this.studentService.getStudentByIdApi(45).subscribe(
          (data: Student) => {
            feedBack.student = data;
            alert('get student: ' + JSON.stringify(feedBack.student));
          }, error => {
            console.log('error get student');
          }
        );*/
        //
        this.feedBackService.createNewFeedBack(feedBack).subscribe(
          (data: FeedBack) => {
            file.feedBack = data;
            alert('feed back create' + JSON.stringify(data));
            this.fileService.createNewFile(file).subscribe(
              (data2: File) => {
                alert('create File' + JSON.stringify(data2));
              }
            );
          }
        );
      }
    }
  }

  onDownload(file: string): void {
    const link = document.createElement('a');
    link.setAttribute('target', 'blank');
    link.setAttribute('href', 'localhost:8080/homework/download/' + file);
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onDownloadFeedBackFile(file: string): void {
    const link = document.createElement('a');
    link.setAttribute('target', 'blank');
    link.setAttribute('href', 'localhost:8080/feedBack/download/' + file);
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onDelete(id: number) {
    this.fileService.deleteFile(id).subscribe(
      ()  => {
        this.fileService.getFiles();
        this.refresh();
        console.log('Delete ');
      },
      error  => {
        console.log('Error ', error);
      }
    );
    this.refresh();
  }

}
