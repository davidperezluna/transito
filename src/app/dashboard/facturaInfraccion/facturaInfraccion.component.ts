import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FacturaInfraccionService } from '../../services/facturaInfraccion.service';
import { LoginService } from '../../services/login.service';
import { FacturaInfraccion } from './facturaInfraccion.modelo';
import { TipoIdentificacionService } from '../../services/tipoIdentificacion.service';
import { CiudadanoService } from '../../services/ciudadano.service';
import swal from 'sweetalert2';
import { ComparendoService } from '../../services/comparendo.service';
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
  public comparendos:any; 
  public ciudadano:any; 
  public tipoIdentificaciones:any; 
  public facturaInfraccion: FacturaInfraccion;
  public ciudadanoEncontrado=1;

  constructor(
		private _FacturaInfraccionService: FacturaInfraccionService,
    private _route: ActivatedRoute,
    private _loginService: LoginService,
    private _tipoIdentificacionService: TipoIdentificacionService,
    private _CiudadanoService: CiudadanoService,
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
    
		this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
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
    let identificacion = {
      'numeroIdentificacion' : this.identificacion,
    };
    this._CiudadanoService.searchByIdentificacion(token,identificacion).subscribe(
        response => {
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
                this.ciudadano = this.respuesta.data;
                let ciudadano = {
                  'ciudadanoId': this.ciudadano.id,
                  }
                  this._ComparendoService.searchComparendosCiudadano(ciudadano, token).subscribe(
                      response => {
                          this.comparendos = response.data;
                          console.log(this.comparendos);
                          this.ciudadanoEncontrado= 2;

                      },
                      error => {
                          this.errorMessage = <any>error;
          
                          if (this.errorMessage != null) {
                              console.log(this.errorMessage);
                              alert('Error en la petición');
                          }
                      }
                  );
        }else{
            this.ciudadanoEncontrado=3;
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

  onInfraccionSelect(valor:any,eve: any){
    if (eve.target.checked) {
      this.facturaInfraccion.valorTotal = this.facturaInfraccion.valorTotal + parseInt(valor);
    }else{
      this.facturaInfraccion.valorTotal = this.facturaInfraccion.valorTotal - parseInt(valor);
    }
    console.log(this.facturaInfraccion.valorTotal);
  }

}