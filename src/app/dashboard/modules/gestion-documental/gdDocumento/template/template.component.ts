import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public file: any = null;
  public errorMessage;


constructor(
  private _DocumentoService: GdDocumentoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const fileSelected: File = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', fileSelected);
    }
  }

  onRegister(){
    let token = this._loginService.getToken();

    this._DocumentoService.template(this.file, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
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
  }
}