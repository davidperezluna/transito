import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CiudadanoService } from '../../services/ciudadano.service';
import { LoginService } from '../../services/login.service';
import { Ciudadano } from './ciudadano.modelo';
import { NewCiudadanoComponent } from './new/new.component';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './ciudadano.component.html',
  providers: [NewCiudadanoComponent],
})
export class CiudadanoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public ciudadanos;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public ciudadano: Ciudadano;

  constructor(
		private _CiudadanoService: CiudadanoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardará unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

		this._CiudadanoService.getCiudadano().subscribe(
      response => {
        this.ciudadanos = response.data;
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
        }, 100);
        swal.close();
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

  iniciarTabla() {
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
  deleteCiudadano(id:any){

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
        this._CiudadanoService.deleteCiudadano(token,id).subscribe(
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

  editCiudadano(ciudadano:any){
    this.ciudadano = ciudadano;
    this.formEdit = true;
    this.formIndex = false;
  }

}