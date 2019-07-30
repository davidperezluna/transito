import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SvIpatImpresoMunicipio } from '../svIpatImpresoMunicipio.modelo';
import { SvIpatImpresoMunicipioService } from '../../../services/svIpatImpresoMunicipio.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public municipio: SvIpatImpresoMunicipio;
  public errorMessage;

  public municipios: any;
  public date: any;

constructor(
  private _ImpresoMunicipioService: SvIpatImpresoMunicipioService,
  private _FuncionarioService: PnalFuncionarioService,
  private _MunicipioService: CfgMunicipioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.municipio = new SvIpatImpresoMunicipio(null, null, null, null, null, null, null, null, null);

    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.date = datePiper.transform(this.date,'yyyy-MM-dd');

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

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.municipio.idOrganismoTransito = response.data.organismoTransito.id;

        } else {
          this.municipio.idOrganismoTransito = null;
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
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