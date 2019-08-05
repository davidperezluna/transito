import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SvIpatImpresoAsignacion } from '../svIpatImpresoAsignacion.modelo';
import { SvIpatImpresoAsignacionService } from '../../../../../services/svIpatImpresoAsignacion.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public asignacion: SvIpatImpresoAsignacion;
  public errorMessage;

  public organismosTransito: any;
  public date: any;
  

constructor(
  private _ImpresoAsignacionService: SvIpatImpresoAsignacionService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.asignacion = new SvIpatImpresoAsignacion(null, null, null, null);

    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.date = datePiper.transform(this.date,'yyyy-MM-dd');

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
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._ImpresoAsignacionService.register(this.asignacion, token).subscribe(
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