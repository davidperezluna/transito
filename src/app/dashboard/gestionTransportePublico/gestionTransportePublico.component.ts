import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { LoginService } from '../../services/login.service';
import { VhloCfgClaseService } from '../../services/vhloCfgClase.service';
import { SedeOperativaService } from '../../services/sedeOperativa.service';
import { GestionTransportePublico } from './gestionTransportePublico.modelo';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './gestionTransportePublico.component.html'
})
export class GestionTransportePublicoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public table:any;
  public vehiculos:any; 
  public gestionTransportePublico:any; 
  public clases:any;
  public sedesOperativas:any;

  constructor(
		private _VehiculoService: VehiculoService,
    private _loginService: LoginService,
    private _claseService: VhloCfgClaseService,
		private _sedeOperativaService: SedeOperativaService,
    ){}
    
  ngOnInit() {
    this.gestionTransportePublico = new GestionTransportePublico(null,null,null);

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
		this._VehiculoService.getVehiculo().subscribe(
        response => {
          this.vehiculos = response.data;
          
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
    this._claseService.getClaseSelect().subscribe(
        response => {
          this.clases = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

     this._sedeOperativaService.getSedeOperativaSelect().subscribe(
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

  onEnviar(){
    
    this.table.destroy();

   let token = this._loginService.getToken();

    this._VehiculoService.filterByParameters(this.gestionTransportePublico,token).subscribe(
      response => {
        this.vehiculos = response.data;
        let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
        }, 100);
        
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