import {Component, OnInit} from '@angular/core';
import {Document} from '../../models/Document.module';
import {DocumentService} from '../../services/document.service';
import {File} from '../../models/File.module';
import {FileType} from '../../models/enums/FileType';
import {FileService} from '../../services/file.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  currentDocument: Document;
  files: File[] = [];
  filesSubject = new Subject<File[]>();
  constructor(private documentService: DocumentService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.refresh();
  }

  emit() {
    this.filesSubject.next(this.files);
  }

  refresh() {
    this.currentDocument = this.documentService.currentDocument;
    this.fileService.getFilesByDocument(this.currentDocument).subscribe(
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
      this.documentService.uploadFile(formData);
      const file = new File();
      file.document = this.currentDocument;
      file.feedBack = null;
      file.type = FileType.Document;
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
    link.setAttribute('href', 'localhost:8080/document/download/' + file);
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
  }

}
