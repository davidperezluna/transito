import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvAudiencia } from '../cvAudiencia.modelo';
import { CvAudienciaService } from '../../../services/cvAudiencia.service';
import { CvCdoComparendoService } from '../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public audiencia: CvAudiencia;
  public errorMessage;
  public numeroComparendo: any = null;
  public comparendo: any = null;

constructor(
  private _AudienciaService: CvAudienciaService,
  private _ComparendoService: CvCdoComparendoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.audiencia = new CvAudiencia(null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearchComparendo() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByNumber({ 'numero':this.numeroComparendo }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.comparendo = response.data;
          this.audiencia.idComparendo = this.comparendo.id;

          swal.close();
        } else {
          this.comparendo = null;

          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          })
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
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.audiencia.idComparendo = this.comparendo.id;
    
		this._AudienciaService.register(this.audiencia, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
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
  }

}