import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SvIpatImpresoMunicipio } from '../svIpatImpresoMunicipio.modelo';
import { SvIpatImpresoMunicipioService } from '../../../services/svIpatImpresoMunicipio.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public municipio: SvIpatImpresoMunicipio;
  public errorMessage;

  public organismosTransito: any;
  public municipios: any;

constructor(
  private _ImpresoMunicipioService: SvIpatImpresoMunicipioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _MunicipioService: CfgMunicipioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.municipio = new SvIpatImpresoMunicipio(null, null, null, null, null);

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
          this.organismosTransito = response;

          swal.close();
      },
      error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
      }
    );

    let token = this._LoginService.getToken();

    this._MunicipioService.selectByDepartamento({'idDepartamento':21}, token).subscribe(
      response => {
          this.municipios = response;

          swal.close();
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

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._ImpresoMunicipioService.register(this.municipio, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          this.ready.emit(true);
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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