import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.scss']
})
export class SubirArchivoComponent {

  constructor(private archivoService: SubirArchivoService) {

  }

  files: any[] = [];
  url?: string;
  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.url = '';
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    this.files = [this.files[0]];
    this.promesa(index).then(() => this.MostrarImagen())

  }

  MostrarImagen() {
    console.log("entro");

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(this.files[0]);
  }

  guardarArchivo() {
    this.archivoService.guardarArchivo(this.files[0]).subscribe(data => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: 'Subida de Archivo',
        text: data.data,
      })
    },err=>console.log("este es el errooorororor---------- ", err))
  }

  promesa(index: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (index === this.files.length) {
          return;
        } else {
          const progressInterval = setInterval(() => {
            if (this.files[index].progress === 100) {
              clearInterval(progressInterval);
              resolve("todo bien");
              this.uploadFilesSimulator(index + 1)
            } else {
              this.files[index].progress += 5;
            }
          }, 100);
        }
      }, 500);
    })
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.files.push(item);
      item.progress = 0;
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: Byte) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


}
