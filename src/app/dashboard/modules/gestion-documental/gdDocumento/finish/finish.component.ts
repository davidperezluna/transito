import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GdDocumento } from '../gdDocumento.modelo';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-finish-gddocumento',
  templateUrl: './finish.component.html'
})
export class FinishComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() documento: any = null;

  public errorMessage;

  public file: any = null;
  public fileSelected: File = null;

  constructor(
    private _DocumentoService: GdDocumentoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onRegister(){
    if (this.fileSelected) {

      let token = this._loginService.getToken();
 
      this._DocumentoService.finish(this.file, { 'idDocumento':this.documento.id }, token).subscribe(
        response => { 
          if (response.code == 200) {
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });

            //this.ready.emit(true);
          } else {
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
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