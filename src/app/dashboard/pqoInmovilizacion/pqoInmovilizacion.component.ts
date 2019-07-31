import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PqoInmovilizacionService } from '../../services/pqoInmovilizacion.service';
import { PqoInmovilizacion } from './pqoInmovilizacion.modelo';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pqoInmovilizacion.component.html'
})
export class PqoInmovilizacionComponent implements OnInit {
  public errorMessage;
  public inmovilizacion: PqoInmovilizacion;

  public inmovilizaciones;
  
	public formNew: any;
	public formEdit: any;
  public formIndex: any;
	public formExit: any;
	public formSearch: any;

  public table:any = true;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Placa' },
  ];
  
  constructor(
    private _InmovilizacionService: PqoInmovilizacionService,
		private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;
  }

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._InmovilizacionService.searchByFilter(this.search, token).subscribe(
			response => {
        if (response.code == 200) {
          this.inmovilizaciones = response.data;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            swal.close();
          }, 100);

          this.onInitForms();

          this.formIndex = true;
        } else {
          this.inmovilizaciones = null;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      }
    );
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formExit = false;
    this.formSearch = false;
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      destroy: true,
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
    this.onInitForms();
    this.formNew = true;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  delete(id:any){
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
        this._InmovilizacionService.delete(token,id).subscribe(
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

  onExit(inmovilizacion:any){
    if (inmovilizacion.numeroComparendo) {
      this.inmovilizacion = inmovilizacion;
  
      this.onInitForms();
  
      this.formExit = true;
    }else{
      swal({
        title: 'Atención!',
        text:'La inmovilización no tiene registrado el número de comparendo por lo tanto no se puede gestionar la salida.',
        type:'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}