import { Component, OnInit } from '@angular/core';
import { FroTrteSolicitudService } from '../../services/froTrteSolicitud.service';
import { UserCfgTipoIdentificacionService } from '../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../services/userCiudadano.service';
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
  public solicitante:any;
  public identificacion:any;
  public tiposIdentificacion:any;
	public tramitesSolicitud;
  public tipoIdentificacionSelected: any;

	public formNew = false;
	public formEdit = false;
  public formIndex = false;
  public formSearchSolicitante = false;
  public formSearch = true;

  public solicitanteEncontrado = 1;
  public table: any = null;
  public tramiteSolicitud: FroTrteSolicitudRnc;
  public moduloId = 1;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'No. factura' },
    { 'value': '2', 'label': 'Fecha' },
  ];

  constructor(
    private _SolicitudRncService: FroTrteSolicitudService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _UserCiudadanoService: UserCiudadanoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    /*this._SolicitudRncService.getByModulo(this.moduloId).subscribe(
				response => {
          this.tramitesSolicitud = response.data;
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
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
      );*/
  }

  onSearch() {
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    this.formSearchSolicitante = false;

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._UserCiudadanoService.searchByFiltros(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.tramitesSolicitud = response.data;
          this.formIndex = true;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
        } else {
          this.tramitesSolicitud = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
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

  onNew(){
    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    this.formSearch = true;
    this.formNew = false;
    this.formIndex = false;

    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.solicitanteEncontrado = 2;
      this.ngOnInit();
    }
  }

  onSearchSolicitante(){
    let token = this._LoginService.getToken();
    this._UserCiudadanoService.searchByIdentificacion({'numeroIdentificacion':this.identificacion},token).subscribe(
      response => {          
        if(response.status == 'success'){ 
          this.solicitante = response.data;
          this.formNew = true;
          this.formEdit = false;
          this.formIndex = false;
          this.formSearch = false;
          this.solicitanteEncontrado = 2;
          swal({
            type: 'info',
            title: 'Perfecto',
            text: "¡Solicitante encontrado!"
          });
        }else{
          this.formNew = false;
          this.formEdit = false;
          this.formIndex = false;
          this.formSearch = true;
          this.solicitanteEncontrado = 3;
          swal({
            type: 'warning',
            title: 'Alerta',
            text: "¡Solicitante no encontrado!"
          });
        }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
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
        this._SolicitudRncService.delete(token,id).subscribe(
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

  onEdit(tramiteSolicitud: any){
    this.tramiteSolicitud = tramiteSolicitud;
    this.formEdit = true;
    this.formIndex = false;
  }
}