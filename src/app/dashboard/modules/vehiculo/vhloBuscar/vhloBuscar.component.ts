import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-buscar-automotor',
  templateUrl: './vhloBuscar.component.html'
})

export class VhloBuscarComponent implements OnInit {
  public errorMessage;
  
  public parametro:any;
  public vehiculo: any;
  public vehiculos: any = null;
  public formShow:any = false;
  public formIndex:any = false;

  public table:any = null;
  
  public datos = {
    'numeroPlaca': null,
    'numeroVin': null,
    'numeroSerie': null,
    'numeroMotor': null,
    'numeroChasis': null,
    'propietario': null,
  };


constructor(
  private _VehiculoService: VhloVehiculoService,
  private _LoginService: LoginService,
){}

  ngOnInit() { }
  
  onSearchVehiculo(){
    this.formShow = false;
  
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._VehiculoService.searchByParameters(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculos = response.data;
          this.formIndex = true;
          this.formShow = false;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
            
          swal.close();                  
        } else {
          this.vehiculos = null;
          swal.close();                  
        }
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
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

  onShow(vehiculo:any){
    this.vehiculo = vehiculo;
    this.formIndex = false;
    this.formShow = true;
  }

  onClose(){
    this.formShow = false;
    this.formIndex = false;

    this.datos.numeroPlaca =  null;
    this.datos.numeroVin =  null;
    this.datos.numeroSerie =  null;
    this.datos.numeroMotor =  null;
    this.datos.numeroChasis =  null;
    this.datos.propietario =  null;
  }
}