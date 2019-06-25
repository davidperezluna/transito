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
	public formExit: any;
  public formIndex: any;

  public table:any; 
  
  constructor(
    private _InmovilizacionService: PqoInmovilizacionService,
		private _loginService: LoginService,
  ){}
    
  ngOnInit() {
    this.onInitForms();

    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._InmovilizacionService.index().subscribe(
      response => {
        this.inmovilizaciones = response.data;

        let timeoutId = setTimeout(() => {
          this.onInitTable();
        }, 100);

        this.formIndex = true;

        swal.close();
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

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formExit = false;
    this.formIndex = false;
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
        let token = this._loginService.getToken();
        this._InmovilizacionService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
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
    this.inmovilizacion = inmovilizacion;

    this.onInitForms();

    this.formExit = true;
  }

  /*onExit(inmovilizacion:any){
    let token = this._loginService.getToken();

    this._InmovilizacionService.exit({ 'id':inmovilizacion.id }, token).subscribe(
      response => {
        if (response.code == 200) {
          swal({
            title: 'Perfecto!',
            text: response.message,
            type:'success',
            confirmButtonText: 'Aceptar'
          });

          this.table.destroy();
          this.ngOnInit();
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type:'error',
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
  }*/
}