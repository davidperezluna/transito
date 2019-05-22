import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImoLoteService } from '../../services/imoLote.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoLote.component.html'
})
export class ImoLoteComponent implements OnInit {
  public errorMessage;
	public id;
	public loteInsumoSustratos;
	public loteInsumoInsumos;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public tipoInsumo :any;
  public table:any; 
  public totalesTipo:any; 
  public loteInsumoInsumo:any; 
  public color:any; 

  constructor(
		private _LoteInsumoService: ImoLoteService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

		this._LoteInsumoService.index().subscribe(
				response => {
          this.loteInsumoSustratos = response.data.loteSustratos;
          console.log(this.loteInsumoSustratos);
          this.loteInsumoInsumos = response.data.loteInsumos; 
          console.log(this.loteInsumoInsumos);
          this.totalesTipo = response.data.totalesTipo; 
          let timeoutId = setTimeout(() => {  
            this.onInitTable();
            swal.close();
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
  
  onInitTable(){
    this.table = $('#dataTables-example-Sustratos').DataTable({
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
  
  deleteRnaLoteInsumo(id:any){
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
        this._LoteInsumoService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
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
 
  editRnaLoteInsumoSustrato(loteInsumoInsumo:any){
    this.loteInsumoInsumo = loteInsumoInsumo;
    this.tipoInsumo = 'SUSTRATO';
    this.formEdit = true;
    this.formIndex = false;
  }

  editRnaLoteInsumoInsumo(loteInsumoInsumo:any){
    this.loteInsumoInsumo = loteInsumoInsumo;
    this.tipoInsumo = 'INSUMO';
    this.formEdit = true;
    this.formIndex = false;
  }

}