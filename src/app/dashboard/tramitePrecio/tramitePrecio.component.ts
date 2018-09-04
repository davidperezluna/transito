import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {TramitePrecioService} from '../../services/tramitePrecio.service';
import {LoginService} from '../../services/login.service';
import {TramitePrecio} from './tramitePrecio.modelo';
import { CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;
// declare var fechaActual: any;


@Component({
  selector: 'app-index',
  templateUrl: './tramitePrecio.component.html'
})
export class TramitePrecioComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public tramitePrecios;
	public tramiteProximo;
	public compa;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public formSmlmv = false;
  public formCalculo = false;
  public table:any; 
  public tramitePrecio: TramitePrecio;
  public fechaActual ;

  constructor(
		private _TramitePrecioService: TramitePrecioService,
		private _loginService: LoginService,
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

		this._TramitePrecioService.getTramitePrecio().subscribe(
				response => {
          this.tramitePrecios = response.tramitePreciosActivo;
          this.tramiteProximo = response.tramiteProximo;
          this.compa = response.compa;
          this.fechaActual = new Date();

          

          console.log(this.tramitePrecios);
          console.log(this.tramiteProximo);
          console.log(this.fechaActual);
          // console.log(this.compa.clase);
          
     
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
    this.formSmlmv = false;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formSmlmv = false;
        this.formCalculo = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }
  deleteTramitePrecio(id:any){

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
        this._TramitePrecioService.deleteTramitePrecio(token,id).subscribe(
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

  editTramitePrecio(tramitePrecio:any){
    this.tramitePrecio = tramitePrecio;
    this.formEdit = true;
    this.formIndex = false;
  }

  onNewSmlmv(){
    this.formEdit = false;
    this.formIndex = false;
    this.formNew = false;
    this.formCalculo =false;
    this.formSmlmv = true;
  }

  onNewCalculo(){
    this.formEdit = false;
    this.formIndex = false;
    this.formNew = false;
    this.formSmlmv = false;
    this.formCalculo = true;
  }

}