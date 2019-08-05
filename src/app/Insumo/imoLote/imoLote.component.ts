import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImoLoteService } from '../../services/imoLote.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoLote.component.html'
})
export class ImoLoteComponent implements OnInit {
  public errorMessage;

	public loteInsumoSustratos;
  public loteInsumoInsumos;
  
	public formSearch: any;
	public formNew: any;
	public formEdit: any;
  public formIndex: any;

  public tipoInsumo :any;
  public table:any; 
  public totalesTipo:any; 
  public loteInsumoInsumo:any; 
  public color:any; 

  public search = {
    'fechaInicial': null,
    'fechaFinal': null,
  }

  constructor(
		private _LoteInsumoService: ImoLoteService,
		private _OrganismoTransitoService: CfgOrganismoTransitoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this.onInitForms();
  }

  onInitForms(){
    this.formSearch = true;
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    
    this._LoteInsumoService.searchByFechas(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.loteInsumoSustratos = response.data.loteSustratos;
          this.loteInsumoInsumos = response.data.loteInsumos; 
          this.totalesTipo = response.data.totalesTipo; 
  
          let timeoutId = setTimeout(() => {  
            this.onInitTable();
            swal.close();
          }, 100); 

          this.onInitForms();
          this.formIndex = true;
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }
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
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example-Sustratos').DataTable({
      responsive: true,
      pageLength: 10,
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
    this.onInitForms();
    this.formNew = true;
  }

  onReady(isCreado:any){
      if(isCreado) {
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
        let token = this._LoginService.getToken();

        this._LoteInsumoService.delete(token,id).subscribe(
            response => {
                swal({
                  title: 'Eliminado!',
                  text:'Registro eliminado correctamente.',
                  type:'success',
                  confirmButtonColor: '#15d4be',
                });

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
 
  onEditLoteInsumoSustrato(loteInsumoInsumo:any){
    this.loteInsumoInsumo = loteInsumoInsumo;
    this.tipoInsumo = 'SUSTRATO';
    this.formEdit = true;
    this.formIndex = false;
  }

  onEditLoteInsumoInsumo(loteInsumoInsumo:any){
    this.loteInsumoInsumo = loteInsumoInsumo;
    this.tipoInsumo = 'INSUMO';
    this.formEdit = true;
    this.formIndex = false;
  }

}