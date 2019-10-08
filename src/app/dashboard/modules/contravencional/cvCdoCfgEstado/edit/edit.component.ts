import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { log } from 'util';

@Component({
  selector: 'app-edit-cvcdocfgestado',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() estado:any = null;
  public errorMessage;
  public formReady = false;
  public formatos;

constructor(
  private _EstadoService: CvCdoCfgEstadoService,
  private _FormatoService: CfgAdmFormatoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){  
    this._FormatoService.select().subscribe(
      response => {
        this.formatos = response;

        setTimeout(() => {
          this.estado.idFormato = [this.estado.formato.id];
        });
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._EstadoService.edit(this.estado, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true); 
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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