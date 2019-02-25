import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { PqoGruaCiudadanoService } from '../../../services/pqoGruaCiudadano.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { PqoGruaCiudadano } from '../pqoGruaCiudadano.modelo';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() grua:any = null;
public gruaCiudadano: PqoGruaCiudadano;
public gruaCiudadanos: any;
public ciudadanos: any;
public ciudadanoSelected: any;
public errorMessage;
public respuesta;
public table:any;

constructor(
  private _GruaUserCiudadanoService: PqoGruaCiudadanoService,
  private _UserCiudadanoService: UserCiudadanoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() { 
    this.gruaCiudadano = new PqoGruaCiudadano(null, null, null, null, null, null);

    this._UserCiudadanoService.select().subscribe(
      response => {
        this.ciudadanos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._GruaUserCiudadanoService.index(this.grua.id).subscribe(
      response => {
        this.gruaCiudadanos = response.data;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  
  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

    this.gruaCiudadano.idGrua = this.grua.id;
    this.gruaCiudadano.idCiudadano = this.ciudadanoSelected;
    
		this._GruaUserCiudadanoService.register(this.gruaCiudadano,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El grua '+  +' ya se encuentra registrado',
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