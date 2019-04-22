import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ImoInsumoService} from '../../services/imoInsumo.service';
import {LoginService} from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoAsignacion.component.html'
})
export class imoAsignacionComponent implements OnInit {
  public errorMessage;

	public id;
	public respuesta;
	public insumoSustratos;
	public InsumoInsumos;
	public formNew = false;
	public formEdit = false;
  public formIndex = true; 
  public tipoInsumo :any;
  public table:any; 
  public InsumoInsumo:any; 
  public color:any; 

  constructor(
		private _ImoInsumoService: ImoInsumoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    /*swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });*/

		// this._ImoInsumoService.indexSustrato().subscribe(
		// 		response => {
    //       this.insumoSustratos = response.data; 
    //       let timeoutId = setTimeout(() => {  
    //         this.iniciarTablaSustrato();
    //       }, 100); 
		// 		}, 
		// 		error => {
		// 			this.errorMessage = <any>error;
		// 			if(this.errorMessage != null){ 
		// 				console.log(this.errorMessage);
		// 				alert("Error en la petición");
		// 			}
		// 		}
    //   );

		// this._ImoInsumoService.indexInsumo().subscribe(
		// 		response => {
    //       this.InsumoInsumos = response.data; 
    //       let timeoutId = setTimeout(() => {  
    //         this.iniciarTablaInsumos();
    //       }, 100); 
		// 		},  
		// 		error => {
		// 			this.errorMessage = <any>error;

		// 			if(this.errorMessage != null){
		// 				console.log(this.errorMessage);
		// 				alert("Error en la petición");
		// 			}
		// 		}
    //   );
  }

  iniciarTablaSustrato(){
    this.table = $('#dataTables-example-Sustratos').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
          'pdf',
      ],
      oLanguage: {
          oPaginate: {
            sFirst: '<i class="fa fa-step-backward"></i>',
            sPrevious: '<i class="fa fa-chevron-left"></i>',
            sNext: '<i class="fa fa-chevron-right"></i>',
            sLast: '<i class="fa fa-step-forward"></i>'
          } 
      }
    });
  }

  iniciarTablaInsumos(){
    this.table = $('#dataTables-example-Insumos').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
          'pdf',
      ],
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
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

  deleteImoInsumoServicey(id:any){
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

        this._ImoInsumoService.delete(token,id).subscribe(
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
 
  editRnaInsumoSustrato(InsumoInsumo:any){
    this.InsumoInsumo = InsumoInsumo;
    this.tipoInsumo = 'sustrato';
    this.formEdit = true;
    this.formIndex = false;
  }

  editRnaInsumoInsumo(InsumoInsumo:any){
    this.InsumoInsumo = InsumoInsumo;
    this.tipoInsumo = 'insumo';
    this.formEdit = true;
    this.formIndex = false;
  }
}