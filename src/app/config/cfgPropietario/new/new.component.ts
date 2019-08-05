import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgPropietario } from '../cfgPropietario.modelo';
import { CfgPropietarioService } from '../../../services/cfgPropietario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public propietario: CfgPropietario;
public errorMessage;

public images = new FormData();

public fileHeader: any = null;
public fileHeaderSelected: File = null;

public fileFooter: any = null;
public fileFooterSelected: File = null;

public fileLogo: any = null;
public fileLogoSelected: File = null;

constructor(
  private _PropietarioService: CfgPropietarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.propietario = new CfgPropietario(null, null, null, null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onFileHeaderChange(event) {
    if (event.target.files.length > 0) {
      this.fileHeaderSelected = event.target.files[0];

      this.images.append('fileHeader', this.fileHeaderSelected);
    }
  }

  onFileFooterChange(event) {
    if (event.target.files.length > 0) {
      this.fileFooterSelected = event.target.files[0];

      this.images.append('fileFooter', this.fileFooterSelected);
    }
  }

  onFileLogoChange(event) {
    if (event.target.files.length > 0) {
      this.fileLogoSelected = event.target.files[0];
      
      this.images.append('fileLogo', this.fileLogoSelected);
    }
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

		this._PropietarioService.register(this.images, this.propietario, token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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