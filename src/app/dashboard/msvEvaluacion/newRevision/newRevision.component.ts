import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MsvRevision } from '../msvRevision.modelo';
import { MsvRevisionService } from '../../../services/msvRevision.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-newRevision',
  templateUrl: './newRevision.component.html'
})
export class NewRevisionComponent implements OnInit {
@Output() ready = new EventEmitter<any>( );
@Input() miEmpresa: any = null;
public msvRevision: MsvRevision;
public contratistas: any;
public contratistaSelected: any;
public empresas: any;
public empresaSelected: any;
public errorMessage;
public respuesta;
public formNew = false;

constructor(
  private _MsvRevisionService: MsvRevisionService,
  private _MsvPersonalFuncionarioService: MpersonalFuncionarioService,
  private _EmpresaService: UserEmpresaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvRevision = new MsvRevision(null, null, null, null, null, null, null, null, null, null, null,null,null,null,null);
    

    this._MsvPersonalFuncionarioService.selectContratistas().subscribe(
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

    this._EmpresaService.select().subscribe(
      response => {
        this.empresas = response;        
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

    this.msvRevision.funcionarioId = this.contratistaSelected;
    this.msvRevision.empresaId = this.miEmpresa.id;

		this._MsvRevisionService.register(this.msvRevision,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          
          swal({
            title: 'Perfecto!',
            text: 'Se ha registrado con exito',
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
          if (response.status == 'success') {
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