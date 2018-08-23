import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RnaInsumoService} from '../../services/rnaInsumos.service';
import {LoginService} from '../../services/login.service';
import {SedeOperativaService} from '../../services/sedeOperativa.service';
import {RnaLoteInsumoService} from '../../services/rnaloteInsumos.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './insumoBusqueda.component.html'
})
export class InsumoBusquedaComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public colors;
	public formNew = false;
  public formShow = false;
  public table:any; 
  public color:any; 
  public sedeOperativaSelected:any;
  public sedesOperativas:any;
  public loteInsumos:any;
  public loteInsumo:any;
  public insumos:any;

  constructor(
		private _RnaInsumoService: RnaInsumoService,
		private _loginService: LoginService,
    private _SedeOperativaService: SedeOperativaService,
    private _rnaRegistroInsumosService: RnaLoteInsumoService,
    ){}
    
  ngOnInit() {
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
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

  onChangedSede(e){
    if (e) {
      let datos={
        'sedeOperativa':this.sedeOperativaSelected,
      } 
      let token = this._loginService.getToken();
      this._rnaRegistroInsumosService.showSedeOperativaInsumo(datos,token).subscribe(
        response => {
          if (response.status == 'success') {
            this.loteInsumos = response.data;
            let timeoutId = setTimeout(() => {  
              this.iniciarTabla();
            }, 100);
          }else{
            swal({
              title: 'Error!',
              text: 'No existen sustratos para esta sede',
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
  showLoteInsumoSustrato(e){
    this.loteInsumo = e;
    let token = this._loginService.getToken();
    this._RnaInsumoService.showLote(this.loteInsumo.id,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.insumos = this.respuesta.datos;
          this.formShow = true;
          // console.log(this.insumos);    
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