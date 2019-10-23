import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SvRevision } from '../svRevision.modelo';
import { SvRevisionService } from '../../../../../services/svRevision.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-revision-svevaluacion',
  templateUrl: './newRevision.component.html'
})
export class NewRevisionComponent implements OnInit {
@Output() ready = new EventEmitter<any>( );
@Input() miEmpresa: any = null;

public msvRevision: SvRevision;
public contratistas: any;
public contratistaSelected: any;
public empresas: any;
public empresaSelected: any;
public errorMessage;
public formNew = false;

constructor(
  private _MsvRevisionService: SvRevisionService,
  private _PnalFuncionarioService: PnalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvRevision = new SvRevision(null, null, null, null, null, null, null, null, null, null, null, null,null,null,null,null);

    this._PnalFuncionarioService.selectContratistas().subscribe(
      response => {
        this.contratistas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();

    this.msvRevision.idFuncionario = this.contratistaSelected;
    this.msvRevision.idEmpresa = this.miEmpresa.id;

		this._MsvRevisionService.register(this.msvRevision, token).subscribe(
			response => {
        if(response.code == 200){
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.ready.emit(true);
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

  onCalcularDevolucion() {
    let token = this._loginService.getToken();

    if (this.msvRevision.fechaRecepcion) {
      this._MsvRevisionService.getFechaDevolucion({ 'fechaRecepcion': this.msvRevision.fechaRecepcion }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.msvRevision.fechaDevolucion = response.fechaDevolucion;
            //swal.close();
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
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

  }

}