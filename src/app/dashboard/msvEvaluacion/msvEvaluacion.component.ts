import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { msvEvaluacionService } from '../../services/msvEvaluacion.service';
import { EmpresaService } from '../../services/empresa.service';
import {LoginService} from '../../services/login.service';
import { msvEvaluacion } from './msvEvaluacion.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvEvaluacion.component.html'
})
export class msvEvaluacionComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public msvEvaluaciones;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any;
  public isError:any; 
  public isExist:any; 
  public msj:any; 
  public nit:any; 
  public empresa:any;
  public msvEvaluacion: msvEvaluacion;

  constructor(
    private _EvaluacionService: msvEvaluacionService,
    private _EmpresaService: EmpresaService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
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
    this._EvaluacionService.getEvaluacion().subscribe(
				response => {
          this.msvEvaluaciones = response.data;
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
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }
  deletemsvEvaluacion(id:any){
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
        this._EvaluacionService.deleteEvaluacion(token,id).subscribe(
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

  onKeyValidateEvaluacion(){
    swal({
      title: 'Buscando Empresa!',
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
    let token = this._loginService.getToken();

    this._EmpresaService.showNitNombre(token,this.nit).subscribe(
      response => {
        console.log(response.data);
        if (response.code == 200 ) {
          this.msj = response.msj;
          this.isError = false;
          this.isExist = true;
          this.empresa=response.data;
          
          swal.close();
        }
        if(response.code == 401){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 400){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          
          swal.close();
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

  editmsvEvaluacion(msvEvaluacion:any){
    this.msvEvaluacion = msvEvaluacion;
    this.formEdit = true;
    this.formIndex = false;
  }
}