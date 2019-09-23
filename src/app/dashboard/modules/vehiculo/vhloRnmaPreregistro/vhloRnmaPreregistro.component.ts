import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloRnaPreregistro } from './vhloRnmaPreregistro.modelo';
import { VhloMaquinariaService } from '../../../../services/vhloMaquinaria.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnmaPreregistro.component.html'
})

export class VhloRnmaPreregistroComponent implements OnInit {
  public errorMessage;

  public vehiculos;
  
  public formSearch: any;
  public formIndex: any;
  public formNew: any;
  public formEdit: any;

  public table:any = null; 

  public vehiculo: VhloRnaPreregistro;

  public datos = {
    'numeroRegistro': null,
    'numeroVin': null,
    'numeroSerie': null,
    'numeroMotor': null,
    'numeroChasis': null,
  }

  constructor(
    private _VehiculoService: VhloVehiculoService,
		private _MaquinariaService: VhloMaquinariaService,
		private _LoginService: LoginService,
  ){}
  
  ngOnInit() {
    this.formSearch = true;
  }

  onInitForms(){
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
  }

  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
      destroy: true,
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

  onSearch(){
    this.onInitForms();

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info',
      showConfirmButton: false,
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._MaquinariaService.index().subscribe(
      response => {
        this.vehiculos = response.data;

        let timeoutId = setTimeout(() => {
          this.onInitTable();
          this.formIndex = true;
          swal.close();
        }, 100);
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

  onNew(){
    this.onInitForms();

    this.formNew = true;
  }

  onEdit(vehiculo:any){
    this.onInitForms();
    this.vehiculo = vehiculo;
    this.formEdit = true;
  }
  
  onDelete(id:any){
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
        swal({
          title: 'Eliminando registro!',
          text: 'Solo tardara unos segundos por favor espere.',
          type: 'info',
          showConfirmButton: false,
          onOpen: () => {
            swal.showLoading()
          }
        });

        let token = this._LoginService.getToken();

        this._VehiculoService.delete({ 'id': id}, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });

              this.ngOnInit();
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
    });
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }
}