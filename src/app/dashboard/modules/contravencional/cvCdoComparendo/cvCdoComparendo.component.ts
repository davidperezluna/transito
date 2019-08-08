import { Component, OnInit } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { CvCdoComparendo } from './cvCdoComparendo.modelo';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvCdoComparendo.component.html'
})

export class CvCdoComparendoComponent implements OnInit {
  public comparendo: CvCdoComparendo;
  public errorMessage:any;

  public organismosTransito: any;
  public comparendos;
  public table: any;

  public file: any = null;
  public fileSelected: File = null;

  public formIndex: any; 
  public formNew: any; 
  public formUpload: any;

  public tiposFuente = [
    { 'value': '1', 'label': 'SSTTDN' },
    { 'value': '2', 'label': 'POLCA' },
  ];

  public datos = {
    'tipoFuente': null,
    'idOrganismoTransito': null,
  };

  constructor(
    private _ComparendoService: CvCdoComparendoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
		private _LoginService: LoginService,
    ){}

  ngOnInit() {
    this.onInitForms();
    
    swal({
      title: 'Cargando datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;

        let timeoutId = setTimeout(() => {
          swal.close();
          this.formIndex = true;
        }, 100);
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onInitForms(){
    this.formIndex = false;
    this.formUpload = false;
    this.formNew = false;
  }

  onCancelar(){
    this.ngOnInit();
  }

  onNew(){
    this.onInitForms();

    this.formNew = true;
  }

  onFormUpload() {
    this.onInitForms();

    this.formUpload = true;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }
 
  /*async ngAbrirInput(polca:any){
    const {value: files} = await swal({
      title: 'Seleccione el archivo .txt',
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
          if (data.length < 19) {
              this.valido = false;
          }else{
            if (data[0] != '') {
              this.txt.push(data);
            }
          }
        }
        
        if (this.valido) {
          let token = this._LoginService.getToken();
          this._ComparendoService.setComparendoArchivo(this.txt,polca,token).subscribe(
            response => {
              if (response.status == 'success') {
                swal('Archivo cargado con exito')
                console.log(response);
              }
            }, 
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
        }else{
          this.valido = true; 
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
        }    
      }
    }
  }*/

  onEnviar() {
    if (this.fileSelected) {
      swal({
        title: 'Subiendo datos!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      let token = this._LoginService.getToken();

      this._ComparendoService.upload(this.file, this.datos, token).subscribe(
        response => {
          if (response.code == 200) {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          } else {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    } else {
      swal({
        title: 'Error!',
        text: 'Debe adjuntar el documento escaneado.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}