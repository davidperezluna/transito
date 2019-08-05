import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgPropietario } from '../cfgPropietario.modelo';
import { CfgPropietarioService } from '../../../../../services/cfgPropietario.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() propietario:any = null;
public errorMessage;

public formReady = false;

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

  ngOnInit(){ }

  onCancelar(){ this.ready.emit(true); }

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

		this._PropietarioService.edit(this.images, this.propietario, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);

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