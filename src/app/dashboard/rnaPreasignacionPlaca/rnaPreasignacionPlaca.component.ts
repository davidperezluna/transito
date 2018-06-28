import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ColorService} from '../../services/color.service';
import {LoginService} from '../../services/login.service';
import {Vehiculo} from '../vehiculo/vehiculo.modelo';
import { CiudadanoVehiculoService } from '../../services/ciudadanoVehiculo.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './rnaPreasignacionPlaca.component.html'
})
export class RnaPreasignacionPlacaComponent implements OnInit {
  public errorMessage;
  public vehiculo: Vehiculo;
	public id;
	public respuesta;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public isError:any; 
  public isExist:any; 
  public msj:any; 
  public vehiculoCriterio:any; 

  constructor(
		private _ColorService: ColorService,
    private _loginService: LoginService,
    private _ciudadanoVehiculoService: CiudadanoVehiculoService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
		this._ColorService.getColor().subscribe(
				response => {
          // this.colors = response.data;
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
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }
  
  deleteColor(id:any){

    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._ColorService.deleteColor(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
                  this.ngOnInit();
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
    })
  }

  onKeyValidateVehiculo(){
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    let token = this._loginService.getToken();

    this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.vehiculoCriterio).subscribe(
      response => {
        if (response.code == 200 ) {
          this.msj = 'vehiculo ya tiene placa asignada';
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 401){
          this.msj = 'vehiculo no se encuentra en la abse de datos';
          this.isError = true;
          this.isExist = false;
        }
        if(response.code == 400){
          this.msj = 'vehiculo encontrado';
          this.isError = false;
          this.isExist = true;
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