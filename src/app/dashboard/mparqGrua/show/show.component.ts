import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MparqGruaCiudadanoService } from '../../../services/mparqGruaCiudadano.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { MparqGruaCiudadano } from '../mparqGruaCiudadano.modelo';
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
public gruaCiudadano: MparqGruaCiudadano;
public gruaCiudadanos: any;
public ciudadanos: any;
public ciudadanoSelected: any;
public errorMessage;
public respuesta;
public table:any;

constructor(
  private _GruaCiudadanoService: MparqGruaCiudadanoService,
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() { 
    this.gruaCiudadano = new MparqGruaCiudadano(null, null, null, null, null, null);

    this._CiudadanoService.getCiudadanoSelect().subscribe(
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

    this._GruaCiudadanoService.index(this.grua.id).subscribe(
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
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
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

    this.gruaCiudadano.gruaId = this.grua.id;
    this.gruaCiudadano.ciudadanoId = this.ciudadanoSelected;
    
		this._GruaCiudadanoService.register(this.gruaCiudadano,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
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