import { Component, OnInit } from '@angular/core';
import { FroTrteSolicitudService } from '../../services/froTrteSolicitud.service';
import { LoginService } from '../../services/login.service';
import { FroTrteSolicitudRnc } from './froTrteSolicitudRnc.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froTrteSolicitudRnc.component.html'
})
export class FroTrteSolicitudRncComponent implements OnInit {
  public errorMessage;
	public id;
  public respuesta;

	public tramitesSolicitud: any = null;

	public formNew = false;
	public formEdit = false;
  public formIndex = false;
  public formSearch = true;

  public table: any = null;
  public tramiteSolicitud: FroTrteSolicitudRnc;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
    'idModulo': 1,
  }

  public tiposFiltro = [
    { 'value': 2, 'label': 'No. factura' },
    { 'value': 3, 'label': 'Fecha' },
    { 'value': 4, 'label': 'No. identificación' },
  ];

  constructor(
    private _SolicitudService: FroTrteSolicitudService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() { }

  onSearch() {
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._SolicitudService.searchByModuloAndFilter(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.tramitesSolicitud = response.data;
        
          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.formIndex = true;
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
          
          this.formIndex = false;
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
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

    this.table = $('#dataTables-example').DataTable({
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
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = true;

    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = false;
      this.formSearch = true;
    }
  }

  onDelete(id: any){
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

        this._SolicitudService.delete(token,id).subscribe(
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
}