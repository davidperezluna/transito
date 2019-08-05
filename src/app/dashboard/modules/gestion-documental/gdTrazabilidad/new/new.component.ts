import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdTrazabilidadService } from '../../../../../services/gdTrazabilidad.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() trazabilidad: any = null;

public uploadUrl = environment.uploadUrl;

public errorMessage;

public file: any;
public fileSelected: File = null;

public datos = {
  'descripcion': null,
  'idTrazabilidad': null,
};


constructor(
  private _TrazabilidadService: GdTrazabilidadService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }

  onEnviar(){
    if (this.fileSelected) {
      this.datos.idTrazabilidad = this.trazabilidad.id;
  
      let token = this._loginService.getToken();
      this._TrazabilidadService.response(this.file, this.datos,token).subscribe(
        response => {
          if(response.status == 'success'){
            this.ready.emit(response.data);

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
          }else{
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
  
      }); 
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