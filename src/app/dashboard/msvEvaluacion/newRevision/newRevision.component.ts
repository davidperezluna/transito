import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { msvRevision } from '../../msvRevision/msvRevision.modelo';
import { msvRevisionService } from '../../../services/msvRevision.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-newRevision',
  templateUrl: './newRevision.component.html'
})
export class NewRevisionComponent implements OnInit {
@Output() ready = new EventEmitter<any>( );
public msvRevision: msvRevision;
public contratistas: any;
public contratistaSelected: any;
public empresas: any;
public empresaSelected: any;
public errorMessage;
public respuesta;
public formNew = false;

constructor(
  private _msvRevisionService: msvRevisionService,
  private _MsvPersonalFuncionarioService: MpersonalFuncionarioService,
  private _EmpresaService: EmpresaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvRevision = new msvRevision(null, null, null, null, null, null,null,null,null,null);


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

    this._EmpresaService.getEmpresaSelect().subscribe(
      response => {
        this.empresas = response;
        console.log(this.empresas);
        
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
    this.msvRevision.empresaId = this.empresaSelected;
    
		this._msvRevisionService.register(this.msvRevision,token).subscribe(
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
            text: 'La revisión ya se encuentra registrado',
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