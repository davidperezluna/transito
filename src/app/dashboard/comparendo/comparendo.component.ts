import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ComparendoService} from '../../services/comparendo.service';
import {LoginService} from '../../services/login.service';
import {Comparendo} from './comparendo.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './comparendo.component.html'
})
export class ComparendoComponent implements OnInit {
  public comparendo: Comparendo;
  public txt:any[]= [];

  constructor(
		private _ComparendoService: ComparendoService,
		private _loginService: LoginService,
    ){}

    
    
    ngOnInit() {	
    swal({
      title: '¿Cual es la fuente del archivo?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'SSTTDN',
      cancelButtonText: 'SETRA DENAR'
    }).then((result) => {
      if (result.value) {
        this.ngAbrirInput(true);
      }else if (result.dismiss === swal.DismissReason.cancel) {
        this.ngAbrirInput(false);
      }
    })
  }

  async ngAbrirInput(polca:boolean){
    const {value: files} = await swal({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'txt/*',
        'aria-label': 'Upload your profile picture'
      }
    })

    if (files) {
      this.txt=[]; 
      let reader: FileReader = new FileReader();
      reader.readAsBinaryString(files);
      reader.onload = (e) => {
        let txt: string = reader.result;
        let allTextLines = txt.split(/\r\n|\n/);
        for (let i = 0; i < allTextLines.length; i++) {
          let data = allTextLines[i].split(',');
          if (data.length < 16) {
            swal('Formato de archivo no valido');
            swal({
              title: 'Error',
              text: "Formato de archivo no valido!",
              type: 'error',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Subir otro archivo!'
            }).then((result) => {
              if (result.value) {
                this.ngOnInit();
              }
            })
          }else{
            if (data[0] != '') {
              this.txt.push(data);
            }
          }
        }
      }
      swal('Archivo cargado con exito')
      console.log(this.txt);
    }

  }   
 
}

