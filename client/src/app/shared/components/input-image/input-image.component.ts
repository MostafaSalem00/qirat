import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { toBase64 } from '../../utilities/utils';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  urls = new Array<string>();
  imageFiles = new Array<File>();
  album:any = [];
  selectedFiles?: File[];

  @Input() urlCurrentImages : string[];

  @Output() onImagesSelected = new EventEmitter<File[]>();
  // @Output() onImagesSelected = new EventEmitter;
  constructor(private _lightbox: Lightbox) { }

  ngOnInit(): void {
  }


  change(event){
    this.urls = [];
    this.imageFiles = [];
    

    if(event.target.files.length > 0){
      this.selectedFiles = event.target.files;
      var filesAmount = event.target.files.length;
      console.log(filesAmount);
      for (let i = 0; i < filesAmount; i++) {
        const file: File = event.target.files[i];
        
        toBase64(file).then((value: string) => { 
          this.urls.push(value); 
          this.album.push({'src':value,'caption':'Imag1','thumb':value});
        });
        this.imageFiles.push(file);
        
        this.onImagesSelected.emit(this.selectedFiles);
      }
      
    }
    console.log(this.urls);
  }

  
  removePhoto(i){
    console.log(this.urls);
    this.urls.splice(i,1);
    this.imageFiles.splice(i,1);
    this.onImagesSelected.emit(this.imageFiles);
		//this.photos.removeAt(i);
    console.log(this.imageFiles);
	}

  open(index: number){
    this._lightbox.open(this.album, index);
    console.log(this.album[index]);
  }

}
