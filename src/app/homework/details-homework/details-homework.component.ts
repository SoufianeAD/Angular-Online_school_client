import { Component, OnInit } from '@angular/core';
import {File} from '../../models/File.module';
import {Subject} from 'rxjs';
import {FileService} from '../../services/file.service';
import {FileType} from '../../models/enums/FileType';
import {Homework} from '../../models/Homework.module';
import {HomeworkService} from '../../services/homework.service';

@Component({
  selector: 'app-details-homework',
  templateUrl: './details-homework.component.html',
  styleUrls: ['./details-homework.component.scss']
})
export class DetailsHomeworkComponent implements OnInit {

  currentHomework: Homework;
  files: File[] = [];
  filesSubject = new Subject<File[]>();
  constructor(private homeworkService: HomeworkService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.refresh();
  }

  emit() {
    this.filesSubject.next(this.files);
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
  }

  onUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.homeworkService.uploadFile(formData);
      const file = new File();
      file.document = this.currentHomework;
      file.feedBack = null;
      file.type = FileType.Homework;
      file.title = event.target.files[0].name;
      this.fileService.createNewFile(file).subscribe(
        (data) => {
          this.fileService.getFiles();
          this.refresh();
        }, (error) => {
          console.log('Erreur : ' + error);
        }
      );
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
