import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloRnaPreregistro } from './vhloRnaPreregistro.modelo';
import { VhloRnaPreregistroService } from '../../../../services/vhloRnaPreregistro.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnaPreregistro.component.html'
})

export class VhloRnaPreregistroComponent implements OnInit, AfterViewInit {
  public errorMessage;

	public vehiculoEncontrado;
  
  public formSearch : any;
  public formIndex : any;
  public formNew : any;
  public formEdit: any;

  public table:any = null; 

  public filtro = null;

  public vehiculo: VhloRnaPreregistro;

  constructor(
    private _VehiculoService: VhloVehiculoService,
		private _RnaPreregistroService: VhloRnaPreregistroService,
		private _LoginService: LoginService,
	
		
  ){}

  ngOnInit() {
    this.onInitForms();
    this.formSearch = true;
  }

  ngAfterViewInit() {
    swal.close();
  }

  onInitForms() {
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      retrieve: true,
      paging: false,
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

  onSearch() {
    let token = this._LoginService.getToken();

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

    this._RnaPreregistroService.searhByFilter({ 'filtro': this.filtro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculoEncontrado = response.data[0];
          console.log(this.vehiculoEncontrado);

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.onInitForms();
          this.formSearch = true;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            swal.close();
          }, 200);
        } else {
          this.formSearch = true;

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

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onNew(){
    this.onInitForms();

    this.formSearch = true;
    this.formNew = true;
  }

  ready(isCreado:any){
    if (isCreado) {
      this.formNew = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onEdit(vehiculo:any){
    this.onInitForms();
    this.vehiculo = vehiculo;
    this.formSearch = true;
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
}