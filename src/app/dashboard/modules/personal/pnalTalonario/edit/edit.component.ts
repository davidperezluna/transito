import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PnalTalonarioService } from '../../../../../services/pnalTalonario.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pnaltalonario',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() talonario:any = null;
public organismosTransito: any;
public sedeOperativaSelected: any;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _TalonarioService: PnalTalonarioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ 
    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
        setTimeout(() => {
          this.sedeOperativaSelected = [this.talonario.sedeOperativa.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCalcularTotal() {
    let ini, fin, rangos;
    ini = this.talonario.desde;
    fin = this.talonario.hasta;
    rangos = (fin - ini);

    if (rangos < 0) {
      rangos = 0;
    }
    this.talonario.rangos = rangos;
  }

  onCancelar(){ 
    this.ready.emit(true); 
  }

  onEnviar(){
    let token = this._loginService.getToken();

    this.talonario.sedeOperativaId = this.sedeOperativaSelected;

		this._TalonarioService.edit(this.talonario,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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