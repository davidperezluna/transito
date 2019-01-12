import { Component, OnInit } from '@angular/core';
import { TramiteSolicitudRpcccService } from '../../services/tramiteSolicitudRpccc.service';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';
import { TipoIdentificacionService } from '../../services/tipoIdentificacion.service';
import { CiudadanoService } from '../../services/ciudadano.service';
import { LoginService } from '../../services/login.service';
import { TramiteSolicitudRpccc } from './tramiteSolicitudRpccc.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './tramiteSolicitudRpccc.component.html'
})
export class TramiteSolicitudRpcccComponent implements OnInit {
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
  public formSearch = false;
  public formIndex = true;
  public table: any;
  public tramiteSolicitud: TramiteSolicitudRpccc;
  public solicitanteEncontrado = 1;
  public moduloId = 5;

  constructor(
    private _TramiteSolicitudRpcccService: TramiteSolicitudRpcccService,
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _TipoIdentificacionService: TipoIdentificacionService,
    private _CiudadanoService: CiudadanoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
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
    });
    this._TramiteSolicitudService.getByModulo(this.moduloId).subscribe(
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
    this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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
    this.table.destroy();
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
    let token = this._loginService.getToken();
    this._CiudadanoService.searchByIdentificacion({'numeroIdentificacion':this.identificacion}, token).subscribe(
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

  deleteTramiteSolicitudRpccc(id: any){
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
        this._TramiteSolicitudRpcccService.delete(token,id).subscribe(
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

  editTramiteSolicitudRpccc(tramiteSolicitud: any){
    this.tramiteSolicitud = tramiteSolicitud;
    this.formEdit = true;
    this.formIndex = false;
  }
}