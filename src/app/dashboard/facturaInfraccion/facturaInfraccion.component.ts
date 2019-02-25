import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FacturaInfraccionService } from '../../services/facturaInfraccion.service';
import { LoginService } from '../../services/login.service';
import { FacturaInfraccion } from './facturaInfraccion.modelo';
import { UserCfgTipoIdentificacionService } from '../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../services/userCiudadano.service';
import { ComparendoService } from '../../services/comparendo.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './facturaInfraccion.component.html'
})
export class FacturaInfraccionComponent implements OnInit {
  public tipo: any;
  public sub: any;
  public errorMessage;
	public id;
	public respuesta;
	public facturaInfracciones;
	public identificacion = false;
  public table:any; 
  public comparendos:any = null; 
  public ciudadano:any; 
  public tipoIdentificaciones:any; 
  public facturaInfraccion: FacturaInfraccion;
  public ciudadanoEncontrado=1;

  constructor(
		private _FacturaInfraccionService: FacturaInfraccionService,
    private _route: ActivatedRoute,
    private _loginService: LoginService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _UserCiudadanoService: UserCiudadanoService,
    private _ComparendoService: ComparendoService,
  ){}
    
  ngOnInit() {
    this.facturaInfraccion = new FacturaInfraccion(null, null, null, null, null, null, 0, null);
    
    swal({
      title: 'Cargando!',
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
    
		this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tipoIdentificaciones = response;
        swal.close();
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
 

  deleteFacturaInfraccion(id:any){
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
        this._FacturaInfraccionService.deleteFacturaInfraccion(token,id).subscribe(
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

  onKeyCiudadano(){
    let token = this._loginService.getToken();
    
    this._ComparendoService.searchByInfractor({ 'infractorIdentificacion': this.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.comparendos = response.data;
          this.ciudadanoEncontrado = 2;
        }else{
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
          this.comparendos = null;
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );   
  }

  onInfraccionSelect(valor:any,eve: any){
    if (eve.target.checked) {
      this.facturaInfraccion.valorTotal = this.facturaInfraccion.valorTotal + parseInt(valor);
    }else{
      this.facturaInfraccion.valorTotal = this.facturaInfraccion.valorTotal - parseInt(valor);
    }
    console.log(this.facturaInfraccion.valorTotal);
  }

}